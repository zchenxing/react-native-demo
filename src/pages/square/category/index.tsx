import React from 'react';
import {
    StyleSheet,
    View,
    FlatList,
} from 'react-native';
import WeiboItem from './weibo-item';
import AwePicturePreview from "../../../components/awe-picture-preview";

const DATA = Array.from(new Array(31).keys()).map(data => {
    return {
        id: Math.random(),
        title: data,
    };
});

const SquareCategory: React.FC = () => {
    const [visible, setVisible] = React.useState(false)
    const [startIndex, setStartIndex] = React.useState(0)
    const [pictures, setPictures] = React.useState<any[]>([])

    const onPreviewPicture = (index: number, pictureList: any[]) => {
        setStartIndex(index)
        setPictures(pictureList)
        setVisible(true)
    }

    return (
        <View style={styles.container}>
            {/*<WeiboItem />*/}
            <FlatList
                data={DATA}
                renderItem={() => <WeiboItem onPicturePress={onPreviewPicture} />}
                keyExtractor={(item: any) => item.id}
            />

            <AwePicturePreview
                visible={visible}
                startIndex={startIndex}
                onClick={() => setVisible(false)}
                imageUrls={pictures.map(data => ({url: data.uri}))}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#333',
        padding: 10,
    },
});

export default SquareCategory;
