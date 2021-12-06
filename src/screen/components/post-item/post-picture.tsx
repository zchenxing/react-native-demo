import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import FastImage from 'react-native-fast-image'
import {screenWidth} from '../../../config/contant';

interface PostPictureProps {
    pictureUri: any[];
    onPressPicture: (startIndex: number) => void;
}

const pictureWrapperWidth = screenWidth - 20;

const PostPicture: React.FC<PostPictureProps> = (props: PostPictureProps) => {
    const [pictureList, setPictureList] = React.useState<string[]>([]);
    const [size, setSize] = React.useState<{width: number; height: number}>({
        width: pictureWrapperWidth,
        height: pictureWrapperWidth / 1.7,
    });

    React.useEffect(() => {
        if (props.pictureUri.length) {
            const list: string[] = [...props.pictureUri]
                .slice(0, 4)
                .map(pic => pic.uri);
            list.slice(0, 4);

            setPictureList(list);

            if (list.length === 4) {
                setSize({
                    height: pictureWrapperWidth / 2,
                    width: pictureWrapperWidth / 2,
                });
            } else if (list.length > 1) {
                setSize({
                    height: (1 / props.pictureUri.length) * pictureWrapperWidth,
                    width: (1 / props.pictureUri.length) * pictureWrapperWidth,
                });
            }
        }
    }, [props.pictureUri]);

    const onPressPicture = (index: number) => {
        props.onPressPicture(index);
    };


    const onLoadError = (index: number) => {
        const list = [...pictureList]
        list.splice(
            index,
            1,
            'https://img2.baidu.com/it/u=283216396,3208798936&fm=26&fmt=auto',
        );
        setPictureList(list)
    }

    return (
        <View style={styles.container}>
            {pictureList.map((uri, index) => {
                return (
                    <TouchableHighlight
                        key={uri}
                        onPress={() => onPressPicture(index)}
                        underlayColor={'none'}>
                        <View
                            style={[
                                styles.imageView,
                                {width: size.width, height: size.height},
                            ]}>
                            <FastImage source={{uri}} style={styles.image} onError={() => onLoadError(index)}>
                                <View
                                    style={[
                                        styles.moreView,
                                        {
                                            display:
                                                index === 3 &&
                                                props.pictureUri.length > 4
                                                    ? 'flex'
                                                    : 'none',
                                        },
                                    ]}>
                                    <Text style={styles.moreText}>
                                        +{props.pictureUri.length - 4}
                                    </Text>
                                </View>
                            </FastImage>
                        </View>
                    </TouchableHighlight>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    imageView: {
        paddingRight: 8,
        paddingBottom: 6,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        overflow: 'hidden',
        borderColor: '#eee',
        borderWidth: 1
    },
    moreView: {
        backgroundColor: 'rgba(10, 10, 10, .3)',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        padding: 10,
    },
    moreText: {
        fontSize: 40,
        color: '#fff',
        fontWeight: '300',
    },
});

export default React.memo(PostPicture);
