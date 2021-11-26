import React from 'react';
import {Modal, StatusBar } from "react-native";
import ImageViewer from 'react-native-image-zoom-viewer';
import {AwePicturePreviewProps} from './type';

const AwePicturePreview: React.FC<AwePicturePreviewProps> = (props: AwePicturePreviewProps) => {


    return (
        <Modal visible={props.visible} transparent={props.transparent}>
            <StatusBar backgroundColor={'#000'} />
            <ImageViewer
                imageUrls={props.imageUrls}
                onClick={props.onClick}
                index={props.startIndex}
                saveToLocalByLongPress={true}
                swipeDownThreshold={10}
                menuContext={{ saveToLocal: '保存到本地', cancel: '取消' }}
                onSaveToCamera={(e) => console.log(e)}
                onSave={e => console.log('e = ', e)}
            />
        </Modal>
    );
}

export default AwePicturePreview;
