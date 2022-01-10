import { action, observable } from "mobx";
import server from "../network";
import apis from "../network/apis";
import { PhotoPictureProps } from "../interface";
import dayjs from "dayjs";
import ReactNativeBlobUtil from "react-native-blob-util";
import { EventEmitterName, isIOS } from "../config/contant";
import { DeviceEventEmitter } from "react-native";
import { AnimalCardType } from "../screen/components/animal-card/type";
import { PostType } from "../enum";

type PublishDataProps = {
    label: string;
    type: string;
    content: string;
};

type DraftType = {
    postType: PostType;
    shareId?: string;
    data: any;
    images: any[];
}

export class PublishDataStore {
    // 已上传图片的id
    @observable uploadedImageIds: {uri: string; id: string}[] = [];
    @observable publishProgress: number = 0;
    // 是否开始发布
    @observable isPublishing: boolean = false;
    // 上传是否发生错误
    @observable happenedError: boolean = false;

    // 草稿箱
    @observable draftBox: DraftType | null = null;
    // 发布图片的总数
    publishImageAmount: number = 0;

    @action.bound setUploadedImageIds = (ids: {uri: string; id: string}[]) => {
        this.uploadedImageIds = ids;
    };

    @action.bound setStartPublish = (status: boolean) => {
        this.isPublishing = status;
    };

    @action.bound setPublishProgress = (progress: number) => {
        this.publishProgress = progress;
    };

    @action.bound setDraftBox = (draftData: DraftType | null) => {
        this.draftBox = draftData
    }

    @action.bound resetPublishData = () => {
        this.publishImageAmount = 0;
        this.publishProgress = 0;
        this.uploadedImageIds = [];
        this.isPublishing = false;
        this.happenedError = false;
        this.draftBox = null;
    };

    /**
     * 上传图片
     * @param image 本地图片信息
     */
    private uploadImage = async (image: PhotoPictureProps) => {
        const file = {
            uri: image.uri,
            type: 'multipart/form-data',
            name: `${dayjs().valueOf()}-${image.fileName}`,
        };
        try {
            // file 转 formData
            const formData = new FormData();
            formData.append('file', file);
            // 上传图片到文件服务器
            const res = await server.post(apis.file.upload('theme'), formData);

            this.uploadedImageIds.push({uri: image.uri, id: res.data.id});

            // 设置发布进度
            this.publishProgress =
                this.uploadedImageIds.length / this.publishImageAmount;
            this.setPublishProgress(this.publishProgress);

            return Promise.resolve({uri: image.uri, id: res.data.id});
        } catch (err) {
            console.log('上传失败 = ', `${file.uri} - ${err}`);
            return Promise.reject(err);
        }
    };

    /**
     * 发布帖子
     * @param publishData 上传的具体内容
     * @param images 上传的图片
     */
    public onPublishData = async (
        publishData: PublishDataProps,
        images: any[],
    ) => {

        this.setDraftBox({
            postType: PostType.Normal,
            data: publishData,
            images,
        })

        try {
            this.setStartPublish(true);

            const serverList: any = [];
            // 组装上传图片请求队列
            if (images && images.length) {
                this.publishImageAmount = images.length + 1;

                images.forEach(img => {
                    serverList.push(this.uploadImage(img));
                });
            }

            // 发起批量请求
            const results = await Promise.all(serverList);

            // 保证顺序按照上传顺序排列
            const image_ids: string[] = [];
            images.forEach((image: any) => {
                results.forEach((result: any) => {
                    if (image.uri === result.uri) {
                        image_ids.push(result.id);
                    }
                });
            });

            const data: any = {
                ...publishData,
                image_ids: image_ids.length ? image_ids : null,
            };

            console.log('需要发布的数据信息 = ', data);

            await server.post(apis.post.create, data);
            // 完成上传，progress设置100%
            this.setPublishProgress(1);

            setTimeout(() => {
                // 发布完成后重置数据
                this.resetPublishData();
                // 刷新首页列表
                DeviceEventEmitter.emit(EventEmitterName.RefreshHome);
            }, 2000);

            return Promise.resolve();
        } catch (err) {
            console.log('Publish error');
            this.happenedError = true;
            return Promise.reject(err);
        }
    };

    // —————————————————————————— 分 - 享 ——————————————————————————————

    /**
     * 上传生物分享的图片
     */
    private uploadShareImage = async (imageUrl: string) => {
        try {
            // 先下载图片到缓存
            const blob = await ReactNativeBlobUtil.config({
                fileCache: true,
                appendExt: 'png',
            }).fetch('GET', imageUrl);

            // 获取图片名字
            const fileName = blob.data.split('/').pop();
            // 获取路径
            const uri = !isIOS ? 'file://' + blob.path() : '' + blob.path();
            // 组装file
            const file = {
                uri: uri,
                type: 'multipart/form-data',
                name: `${dayjs().valueOf()}-${fileName}`,
            };
            console.log('组装的file', file);
            // file -> formData
            const formData = new FormData();
            formData.append('file', file);
            // 上传图片
            const res = await server.post(apis.file.upload('theme'), formData);
            // 将返回的图片id放入【已完成图片id数组】中
            this.uploadedImageIds.push({uri, id: res.data.id});
            // 设置发布进度
            this.publishProgress =
                this.uploadedImageIds.length / this.publishImageAmount;
            this.setPublishProgress(this.publishProgress);

            return Promise.resolve({url: imageUrl, id: res.data.id});
        } catch (err) {
            console.log('上传分享图片失败 = ', `${imageUrl} - ${err}`);
            return Promise.reject(err);
        }
    };

    /**
     * 上传Google图片
     * @param uri
     */
    private getGooglePicture = async (uri: string) => {
        try {
            // 获取图片名字
            const fileName = uri.split('/').pop();
            // 组装file
            const file = {
                uri: uri,
                type: 'multipart/form-data',
                name: `${dayjs().valueOf()}-${fileName}`,
            };

            console.log('组装的file', file);

            // file -> formData
            const formData = new FormData();
            formData.append('file', file);
            // 上传图片
            const res = await server.post(apis.file.upload('theme'), formData);

            this.setPublishProgress(0.05);

            return Promise.resolve(res.data.id);
        } catch (err) {
            console.log('Google map picture upload error:', err);
            return Promise.reject(err);
        }
    };

    /**
     * 发布分享数据
     * @param shareId
     * @param data
     * @param imageUrls
     * @param shareType
     */
    public onPublishShare = async (
        shareId: string,
        data: any,
        imageUrls: string[],
        shareType: AnimalCardType,
    ) => {

        this.setDraftBox({
            shareId,
            postType:
                shareType === AnimalCardType.ShareType
                    ? PostType.BiologicalCard
                    : PostType.Entrust,
            images: [],
            data
        })


        this.setStartPublish(true);

        // 如果是委托，需要下载Google map地图
        if (shareType === AnimalCardType.QuestType) {
            this.publishImageAmount = imageUrls.length + 2;

            data.entrust.device_info.geo_round_image_id =
                await this.getGooglePicture(data.googleMapPic);
        } else {
            this.publishImageAmount = imageUrls.length + 1;
        }

        const uploadList: any[] = [];
        imageUrls.forEach(url => {
            uploadList.push(this.uploadShareImage(url));
        });

        const results = await Promise.all(uploadList);

        try {
            // 保证顺序按照上传顺序排列
            const image_ids: string[] = [];
            imageUrls.forEach(url => {
                results.forEach((result: any) => {
                    if (url === result.url) {
                        image_ids.push(result.id);
                    }
                });
            });
            image_ids.reverse();

            // 分享和委托的生物图片存放位置不同
            if (shareType === AnimalCardType.ShareType) {
                data.biological_card.biological_image_ids = image_ids;
            } else {
                data.entrust.biological_info.image_ids = image_ids;
            }

            console.log('需要发布的数据信息 = ', JSON.stringify(data));

            await server.post(apis.post.create, data);
            // 完成上传，progress设置100%
            this.setPublishProgress(1);

            setTimeout(() => {
                // 发布完成后重置数据
                this.resetPublishData();
                // 刷新首页列表
                DeviceEventEmitter.emit(EventEmitterName.RefreshHome);
            }, 2000);

            return Promise.resolve();
        } catch (err) {
            console.log('Share error');
            this.happenedError = true;
            return Promise.reject(err);
        }
    };

}
