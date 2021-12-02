import React from 'react';
import {View} from 'react-native';
import ImageView from 'react-native-image-viewing';
import {Button} from 'react-native-elements';
import {pictureList} from '../../mock';
import AweImageRank from '../../components/awe-image-rank';

const imageUrl: string[] = pictureList.map(picture => picture.uri)

const ImageViewing: React.FC = () => {
    const [visible, setIsVisible] = React.useState(false);

    return (
        <View>
            <Button
                title={'打开图片'}
                type={'outline'}
                onPress={() => setIsVisible(true)}
            />

            <AweImageRank images={imageUrl} />

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
