import {action, observable} from 'mobx';
import {UserInfoProps} from '../interface/work';
import server from '../network';
import apis from '../network/apis';
import {PictureProps} from '../interface';
import dayjs from 'dayjs';

type PublishDataProps = {
    label: string;
    type: string;
    content: string;
};

export class PublishDataStore {

    // 已上传图片的id
    uploadedImageIds: string[] = [];


    /**
     * 上传图片
     * @param image 本地图片信息
     */
    private uploadImage = async (image: PictureProps) => {

        try {
            const file = {
                uri: image.uri,
                type: 'multipart/form-data',
                name: `${dayjs().valueOf()}-${image.fileName}`,
            };
            const formData = new FormData();
            formData.append('file', file);

            const res = await server.post(apis.file.upload('theme'), formData)

            this.uploadedImageIds.push(res.data.id)
            return Promise.resolve()
        } catch (err) {
            return Promise.reject(err)
        }
    };

    /**
     * 发布帖子
     * @param publishData 上传的具体内容
     * @param images 上传的图片
     */
    public startPublish = async (
        publishData: PublishDataProps,
        images: any[],
    ) => {
        try {

            // 组装上传图片请求队列
            const serverList: any = []
            images.forEach(img => {
                serverList.push(this.uploadImage(img))
            })
            // 发起批量请求
            await Promise.all(serverList)

            const data: any = {
                ...publishData,
                image_ids: [...this.uploadedImageIds],
            };

            // 上传后将已上传图片ids置空
            this.uploadedImageIds = []

            console.log('开始发布数据: ', data);

            await server.post(apis.post.create, data);

            console.log('发布成功');
            return Promise.resolve()
        } catch (err) {
            console.log('Publish error');
            return Promise.reject(err)
        }
    };

}
