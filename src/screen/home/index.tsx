import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import { globalStyles } from "../../assets/styles";
import HomeHeader from './header';
import { NavigateProps } from "../../interface";
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from "react-native";
import ScreenBase from '../components/screen-base';
import { postList } from "../../mock";
import PostItem from '../components/post-item';
import AwePicturePreview from "../../components/awe-picture-preview";


const HomeScreen: React.FC<NavigateProps> = (props: NavigateProps) => {

    const [refreshing, setRefreshing] = React.useState(false);
    const [loadMoreEnd, setLoadMoreEnd] = React.useState(false);
    const [pictureVisible, setPictureVisible] = React.useState(false)
    const [pictureStartIndex, setPictureStartIndex] = React.useState<number>(0)
    const [pictureList, setPictureList] = React.useState<any[]>([])

    const onSearch = () => {

    }


    const onPublish = () => {

    }

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


    const onPressPicture = (pictureList: any[], startIndex: number) => {
        setPictureVisible(true)
        setPictureStartIndex(startIndex)

        const list = pictureList.map(picture => ({url: picture.uri}))
        setPictureList(list)
    }

    return (
        <SafeAreaProvider style={[globalStyles.container]}>
            <HomeHeader onSearch={onSearch} onPublish={onPublish} />
            <ScreenBase>
                <FlatList
                    data={postList}
                    renderItem={(item: any) => (
                        <PostItem {...item} onPressPicture={onPressPicture} />
                    )}
                    keyExtractor={(item) => item.id}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefreshData}
                        />
                    }
                    ListFooterComponent={() => loadMore()}
                    onEndReached={() => onLoadMore()}
                />
            </ScreenBase>



            <AwePicturePreview
                visible={pictureVisible}
                onClick={() => setPictureVisible(false)}
                imageUrls={pictureList}
                startIndex={pictureStartIndex}
            />

        </SafeAreaProvider>
    );
};

export default HomeScreen;
