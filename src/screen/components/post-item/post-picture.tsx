import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Image} from 'react-native-elements';
import {screenWidth} from '../../../config/contant';

interface PostPictureProps {
    pictureUri: string[];
}

const PostPicture: React.FC<PostPictureProps> = (props: PostPictureProps) => {
    const [size, setSize] = React.useState<{width: number; height: number}>({
        width: 1,
        height: 190,
    });

    React.useEffect(() => {
        setSize({
            height: (1 / props.pictureUri.length) * (screenWidth - 20),
            width: (1 / props.pictureUri.length) * (screenWidth - 20),
        });
    }, []);

    return (
        <View style={styles.container}>
            {props.pictureUri.map(uri => {
                return (
                    <View
                        key={uri}
                        style={[
                            styles.imageView,
                            {width: size.width, height: size.height},
                        ]}>
                        <Image source={{uri}} style={styles.image} />
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    imageView: {
        paddingRight: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
});

export default React.memo(PostPicture);
