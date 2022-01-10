import React from 'react';
import { ActivityIndicator, Image, Modal, StatusBar, StyleSheet, View } from "react-native";
import ImageViewer from 'react-native-image-zoom-viewer';
import {AwePicturePreviewProps} from './type';
import {localImages} from '../../assets/images';
import {screenHeight, screenWidth} from '../../config/contant';

const AwePicturePreview: React.FC<AwePicturePreviewProps> = (
    props: AwePicturePreviewProps,
) => {
    const [dataSource, setDataSource] = React.useState<any[]>([]);

    React.useEffect(() => {
        if (props.visible) {
            const list = props.imageUrls.map(url => ({url}));


            setDataSource(list);
        } else {
            setDataSource([]);
        }
    }, [props.visible]);

    return (
        <Modal
            visible={props.visible}
            transparent={props.transparent}
            animationType={'fade'}
        >
            <StatusBar backgroundColor={'#000'} />

            {
                dataSource.length ?
                <ImageViewer
                    imageUrls={dataSource}
                    failImageSource={localImages.defaultPicture}
                    onClick={props.onClick}
                    index={props.startIndex}
                    saveToLocalByLongPress={false}
                    swipeDownThreshold={100}
                    enableSwipeDown={true}
                    onSwipeDown={props.onClick}
                    menuContext={{ saveToLocal: '保存到本地', cancel: '取消' }}
                    onSaveToCamera={(e) => console.log(e)}
                    onSave={e => console.log('e = ', e)}
                    enablePreload={true}
                    loadingRender={() => {
                        return (
                            <View style={styles.indicator}>
                                <ActivityIndicator color={'#fff'} size={'large'} />
                            </View>
                        )
                    }}
                    renderImage={(item) => {
                        return (
                            <View style={styles.container}>
                                <Image
                                    source={{uri: item.source.uri}}
                                    style={item.style}
                                />
                            </View>
                        )
                    }}
                /> : <View />
            }
        </Modal>
    );
};

export default AwePicturePreview;


const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        height: screenHeight
    },
    indicator : {
        width: screenWidth,
        height: screenHeight,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
