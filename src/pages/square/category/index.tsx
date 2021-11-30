import React from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    RefreshControl,
    ActivityIndicator,
} from 'react-native';
import WeiboItem from './weibo-item';
import AwePicturePreview from '../../../components/awe-picture-preview';

const DATA = Array.from(new Array(5).keys()).map(data => {
    return {
        id: Math.random(),
        title: data,
    };
});

const SquareCategory: React.FC = () => {
    const [visible, setVisible] = React.useState(false);
    const [startIndex, setStartIndex] = React.useState(0);
    const [pictures, setPictures] = React.useState<any[]>([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [loadMoreEnd, setLoadMoreEnd] = React.useState(false);

    const onPreviewPicture = (index: number, pictureList: any[]) => {
        setStartIndex(index);
        setPictures(pictureList);
        setVisible(true);
    };

    const onRefreshData = () => {
        setRefreshing(true);

        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    };

    const loadMore = () => {
        return loadMoreEnd ? (
            <View>
                <Text>没有更多了</Text>
            </View>
        ) : (
            <View>
                <ActivityIndicator />
                <Text style={{textAlign: 'center'}}>加载更多</Text>
            </View>
        );
    };

    const onLoadMore = () => {
        setTimeout(() => {
            setLoadMoreEnd(true);
        }, 3000);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={() => (
                    <WeiboItem onPicturePress={onPreviewPicture} />
                )}
                keyExtractor={(item: any) => item.id}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefreshData}
                    />
                }
                ListFooterComponent={() => loadMore()}
                onEndReached={() => onLoadMore()}
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
