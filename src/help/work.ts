import {UserEventProps} from '../interface/work';
import {PhotoPictureProps} from '../interface';
import ImageResizer from 'react-native-image-resizer';
import { GOOGLE_KEY, isIOS } from "../config/contant";
import ReactNativeBlobUtil from "react-native-blob-util";

const WorkHelp = {
    /**
     * 根据id，获取数据源的下标
     * @param id
     * @param dataSource
     */
    getDataSourceIndex: (dataSource: any[], id: string) => {
        let resultIndex: number = -1;

        for (let i = 0; i < dataSource.length; i++) {
            if (dataSource[i].id === id) {
                resultIndex = i
                break
            }
        }

        return resultIndex;
    },

    /**
     * 判断用户是否被关注
     * @param userEvents
     * @param useType
     */
    userEventExist: (
        userEvents: UserEventProps[] | null | undefined,
        useType: number,
    ): {isExist: boolean; existIndex: number} => {
        let isExist: boolean = false;
        let existIndex: number = -1;

        // 判断是否关注
        if (userEvents) {
            userEvents.forEach((event, index) => {
                if (event.event_type === useType) {
                    isExist = true;
                    existIndex = index;
                }
            });
        }

        return {
            isExist,
            existIndex,
        };
    },

    /**
     * 压缩图片，超过2M就进行压缩
     * @param photos
     */
    compressPicture: async (photos: PhotoPictureProps[]) => {
        const resizeList: any[] = [];
        photos.forEach(photo => {
            resizeList.push(WorkHelp.onResizePicture(photo));
        });

        const result = await Promise.all(resizeList);

        return Promise.resolve(result);
    },

    /**
     * 修改图片尺寸
     * @param photo
     */
    onResizePicture: async (photo: PhotoPictureProps) => {
        // 判断大于2M，不用1024，用1000，将压缩范围扩大
        if (photo.size > 2000000) {
            const size = Math.floor(photo.size / 1000000);
            const rate = 3 / size;

            const newPhoto = await ImageResizer.createResizedImage(
                photo.realPath,
                photo.width * rate,
                photo.height * rate,
                photo.uri.indexOf('.png') === -1 ? 'JPEG' : 'PNG',
                rate * 100,
            );

            return Promise.resolve({
                ...photo,
                size: newPhoto.size,
                width: newPhoto.width,
                height: newPhoto.height,
                uri: newPhoto.uri,
            });
        } else {
            return Promise.resolve(photo);
        }
    },


    /**
     * 生成Google地图定位图片
     */
    getGoogleMapPicture: async (values: {
        zoom: number;
        lng: number;
        lat: number;
    }) => {
        const googleMap = `http://maps.googleapis.com/maps/api/staticmap?maptype=roadmap&zoom=16&center=${values.lat},${values.lng}&size=640x428&markers=anchor:center%7Cicon:https://goo.gl/5y3S82%7C${values.lat},${values.lng}&key=${GOOGLE_KEY}`

        try {
            // 先下载图片到缓存
            const blob = await ReactNativeBlobUtil.config({
                fileCache: true,
                appendExt: 'png',
            }).fetch('GET', googleMap);

            // 获取路径
            const uri = !isIOS ? 'file://' + blob.data : '' + blob.data;

            return Promise.resolve(uri)
        } catch (err) {
            return Promise.reject(err)
        }


    }

};

export default WorkHelp;
