import React from 'react';
import { Modal, StatusBar, View } from "react-native";
import ImageViewer from 'react-native-image-zoom-viewer';
import {AwePicturePreviewProps} from './type';

const AwePicturePreview: React.FC<AwePicturePreviewProps> = (
    props: AwePicturePreviewProps,
) => {

    const [dataSource, setDataSource] = React.useState<any[]>([])

    React.useEffect(() => {

        if (props.visible) {
            const list = props.imageUrls.map(url => ({url}))
            setDataSource(list)
        } else {
            setDataSource([])
        }

    }, [props.visible])


    return (
        <Modal visible={props.visible} transparent={props.transparent}>

            <StatusBar backgroundColor={'#000'} />
            {
                dataSource.length ?
                <ImageViewer
                    imageUrls={dataSource}
                    failImageSource={{
                        url: 'https://img2.baidu.com/it/u=283216396,3208798936&fm=26&fmt=auto'
                    }}
                    onClick={props.onClick}
                    index={props.startIndex}
                    saveToLocalByLongPress={true}
                    swipeDownThreshold={10}
                    menuContext={{ saveToLocal: '保存到本地', cancel: '取消' }}
                    onSaveToCamera={(e) => console.log(e)}
                    onSave={e => console.log('e = ', e)}
                    enablePreload={true}
                /> : <View />
            }

        </Modal>
    );
}

export default AwePicturePreview;
