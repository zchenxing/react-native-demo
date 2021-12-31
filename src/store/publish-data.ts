import {action, observable} from 'mobx';
import {UserInfoProps} from '../interface/work';
import server from '../network';
import apis from '../network/apis';
import {PhotoPictureProps} from '../interface';
import dayjs from 'dayjs';

type PublishDataProps = {
    label: string;
    type: string;
    content: string;
};

export class PublishDataStore {
    // 已上传图片的id
    @observable uploadedImageIds: string[] = [];
    @observable publishProgress: number = 0;
    // 是否开始发布
    @observable isPublishing: boolean = false
    // 发布图片的总数
    publishImageAmount: number = 0

    @action.bound setUploadedImageIds = (ids: string[]) => {
        this.uploadedImageIds = ids;
    };

    @action.bound setStartPublish = (status: boolean) => {
        this.isPublishing = status
    }

    @action.bound setPublishProgress = (progress: number) => {
        this.publishProgress = progress
    }

    @action.bound resetPublishData = () => {
        this.publishImageAmount = 0
        this.publishProgress = 0;
        this.uploadedImageIds = [];
        this.isPublishing = false
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
            const formData = new FormData();
            formData.append('file', file);

            const res = await server.post(apis.file.upload('theme'), formData);

            this.uploadedImageIds.push(res.data.id);
            // 设置发布进度
            this.publishProgress = this.uploadedImageIds.length / this.publishImageAmount
            this.setPublishProgress(this.publishProgress)

            return Promise.resolve({uri: image.uri, id: res.data.id});
        } catch (err) {
            console.log('上传失败 = ',`${file.uri} - ${err}`);
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
        try {

            this.setStartPublish(true)

            const serverList: any = [];
            // 组装上传图片请求队列
            if (images && images.length) {

                this.publishImageAmount = images.length + 1

                images.forEach(img => {
                    serverList.push(this.uploadImage(img));
                });

            }

            // 发起批量请求
            const results = await Promise.all(serverList);

            // 保证顺序按照上传顺序排列
            const image_ids: string[] = []
            images.forEach((image: any) => {
                results.forEach((result: any) => {
                    if (image.uri === result.uri) {
                        image_ids.push(result.id)
                    }
                })
            })


            const data: any = {
                ...publishData,
                image_ids: image_ids.length ? image_ids : null,
            };

            console.log('需要发布的数据信息 = ', data);

            await server.post(apis.post.create, data);
            // 完成上传，progress设置100%
            this.setPublishProgress(1)

            setTimeout(() => {
                // 发布完成后重置数据
                this.resetPublishData();
            }, 2000)


            return Promise.resolve();
        } catch (err) {
            console.log('Publish error');
            return Promise.reject(err);
        }
    };
}
