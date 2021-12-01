import React from 'react';
import {View} from 'react-native';
import ImageView from 'react-native-image-viewing';
import {Button} from 'react-native-elements';
import {pictureList} from '../../mock';

const ImageViewing: React.FC = props => {
    const [visible, setIsVisible] = React.useState(false);

    const openCamera = () => {

    };

    return (
        <View>
            <Button
                title={'打开图片'}
                type={'outline'}
                onPress={() => setIsVisible(true)}
            />

            <Button title={'打开相机'} type={'solid'} onPress={openCamera} />

            <ImageView
                images={pictureList}
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
                swipeToCloseEnabled={true}
            />
        </View>
    );
};

export default ImageViewing;
