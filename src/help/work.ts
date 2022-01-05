import {UserEventProps} from '../interface/work';
import {PhotoPictureProps} from '../interface';
import ImageResizer from 'react-native-image-resizer';

const WorkHelp = {
    /**
     * 根据id，获取数据源的下标
     * @param id
     * @param dataSource
     */
    getDataSourceIndex: (id: string, dataSource: any[]) => {
        let resultIndex: number = -1;

        for (const index in dataSource) {
            if (dataSource[index].id === id) {
                resultIndex = parseInt(index, 10);
                break;
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



};

export default WorkHelp;
