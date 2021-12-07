import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import { globalStyles } from "../../assets/styles";
import HomeHeader from './header';
import { NavigateProps } from "../../interface";
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from "react-native";
import ScreenBase from '../components/screen-base';
import { postList } from "../../mock";
import PostItem from '../components/post-item';
import AwePicturePreview from '../../components/awe-picture-preview';
import PostComment from '../components/post-comments';
import { INTELINK_SCREEN_NAME } from "../../config/page-name";

const HomeScreen: React.FC<NavigateProps> = (props: NavigateProps) => {

    const [refreshing, setRefreshing] = React.useState(false);
    const [loadMoreEnd, setLoadMoreEnd] = React.useState(false);
    const [pictureVisible, setPictureVisible] = React.useState(false)
    const [pictureStartIndex, setPictureStartIndex] = React.useState<number>(0)
    const [pictureList, setPictureList] = React.useState<any[]>([])
    const [commentVisible, setCommentVisible] = React.useState(false)

    const onPressSearch = () => {
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_SEARCH)
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

    /**
     * 浏览图片
     * @param pictures
     * @param startIndex
     */
    const onPressPicture = (pictures: any[], startIndex: number) => {
        setPictureVisible(true)
        setPictureStartIndex(startIndex)

        const list = pictures.map(picture => ({url: picture.uri}))
        setPictureList(list)
    }


    /**
     * 查看评论
     */
    const onPressComment = () => {
        setCommentVisible(true)
    }

    return (
        <SafeAreaProvider style={[globalStyles.container]}>
            <HomeHeader onSearch={onPressSearch} onPublish={onPublish} />
            <ScreenBase>
                <FlatList
                    data={postList}
                    removeClippedSubviews={true}
                    keyExtractor={(item) => item.id}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefreshData}
                        />
                    }
                    renderItem={(item: any) => (
                        <PostItem {...item} onPressPicture={onPressPicture} onPressComment={onPressComment} />
                    )}
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


            <PostComment
                visible={commentVisible}
                onClose={() => setCommentVisible(false)}
            />

        </SafeAreaProvider>
    );
};

export default HomeScreen;
