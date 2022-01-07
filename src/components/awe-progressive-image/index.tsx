import React, {FC} from 'react';
import { View, StyleSheet, ViewStyle } from "react-native";
import FastImage, { FastImageProps, ResizeMode } from "react-native-fast-image";



interface IProps {
    thumbnailSource?: FastImageProps['source'];
    source: FastImageProps['source'];
    width: number
    height: number
    containerStyle?: ViewStyle;
    resizeMode?: ResizeMode
}

const AweProgressiveImage: FC<IProps> = (props: IProps) => {


    function handleThumbnailLoad() {

    }

    function onImageLoad() {

    }

    return (
        <View
            style={[
                styles.container,
                {width: props.width, height: props.height},
                props.containerStyle,
            ]}>

            {props.thumbnailSource && (
                <FastImage
                    source={props.thumbnailSource}
                    style={{width: props.width, height: props.height}}
                    onLoad={handleThumbnailLoad}
                    resizeMode={props.resizeMode}
                />
            )}

            <FastImage
                source={props.source}
                style={[styles.imageOverlay]}
                onLoad={onImageLoad}
                resizeMode={props.resizeMode}
            />
        </View>
    );
};

export default AweProgressiveImage

const styles = StyleSheet.create({
    imageOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
    },
    container: {
        backgroundColor: '#e1e4e8',
    },
});

