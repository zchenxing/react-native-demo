import React from 'react';
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    TouchableHighlight,
    Text,
    View,
    DeviceEventEmitter
} from "react-native";
import PostItem from '../post-item';
import AwePicturePreview from '../../../components/awe-picture-preview';
import PostCommentSheet from '../post-comments-sheet';
import {useLanguage} from '../../../language';
import { useNetwork, useSetState } from "ahooks";
import { PostListProps } from "./type";
import { PostContentProps } from "../../../interface/work";
import server from "../../../network";
import apis from "../../../network/apis";
import apiConfig from "../../../network/config";
import ScreenBase from "../screen-base";
import { EventEmitterName } from "../../../config/contant";
import { useNetInfo } from "@react-native-community/netinfo";

interface IState {

    dataSource: PostContentProps[]
    refreshing: boolean
    moreLoading: boolean
    hasMoreData: boolean

    pictureVisible: boolean
    pictureStartIndex: number
    pictureList: any[]
    commentVisible: boolean
}

const PostList: React.FC<PostListProps> = (props: PostListProps) => {

    const netInfo = useNetInfo();

    const [state, setState] = useSetState<IState>({
        refreshing: false,
        moreLoading: false,
        dataSource: [],
        hasMoreData: true,

        pictureVisible: false,
        pictureStartIndex: 0,
        pictureList: [],
        commentVisible: false
    })

    React.useEffect(() => {
        onLoadData()

        // 监听是否发布了新的帖子
        const eventEmitter = DeviceEventEmitter.addListener(
            EventEmitterName.RefreshHome,
            onLoadData,
        );

        return () => eventEmitter.remove()

    }, [state.refreshing])


    const getDataSource = async (id?: string) => {
        try {
            const res = await server.get(
                apis.post.list(id),
                apiConfig.pageToken(),
            );
            // console.log(Math.floor(Math.random() * 100), res.data);
            return Promise.resolve(res.data);
        } catch (err) {
            return Promise.reject(err);
        }
    };

    /**
     * 加载数据
     */
    const onLoadData = async () => {
        try {
            const data = await getDataSource();
            setState({
                dataSource: data,
                refreshing: false,
            });
        } catch (err) {
            console.log(err);
        }
    };


    /**
     * 下拉刷新数据
     */
    const onRefreshData = () => {
        setState({
            refreshing: true,
        });
    };

    /**
     * 加载更多数据
     */
    const onLoadMoreData = async (hasMoreData: boolean) => {

        // 当有更多数据时才自动加载更多数据，否则不做操作
        if (hasMoreData) {

            setState({
                moreLoading: true
            })

            try {
                const _id = state.dataSource[state.dataSource.length - 1].id;
                const data = await getDataSource(_id);
                if (data.length) {
                    setState({
                        dataSource: [...state.dataSource, ...data],
                        moreLoading: false,
                        hasMoreData: true
                    });
                } else {
                    setState({
                        moreLoading: false,
                        hasMoreData: false
                    })
                }

            } catch (err) {

            }
        }
    };


    /**
     * 点击"没有更多数据"，手动加载更多数据
     */
    const handleNoMoreData = () => {
        setState({
            moreLoading: true,
            hasMoreData: true
        })

        onLoadMoreData(true)
    }

    const loadMore = () => {
        return state.moreLoading ? (
            <View>
                <ActivityIndicator />
                <Text style={{textAlign: 'center'}}>
                    {useLanguage.load_more}
                </Text>
            </View>
        ) : (
            <>
                {
                    !state.hasMoreData &&
                    <TouchableHighlight
                        style={{padding: 10}}
                        onPress={handleNoMoreData}>
                        <Text style={{textAlign: 'center'}}>
                            没有更多数据
                        </Text>
                    </TouchableHighlight>
                }
            </>
        );
    };


    /**
     * 浏览图片
     * @param pictures
     * @param startIndex
     */
    const onPressPicture = (pictures: any[], startIndex: number) => {

        const list = pictures.map(picture => (picture.uri));

        setState({
            pictureVisible: true,
            pictureStartIndex: startIndex,
            pictureList: list
        })

    };

    /**
     * 查看评论
     */
    const onPressComment = () => {
        setState({
            commentVisible: true
        })
    };


    /**
     * 点击收藏 | 取消收藏
     */
    const onPressCollection = async (data: any) => {
        // console.log(data);

        if (netInfo.type !== 'none') {

            try {

                const posts = [...state.dataSource]
                if (posts[data.index].user_events) {
                    posts[data.index].user_events = null
                } else {
                    posts[data.index].user_events = []
                }

                setState({
                    dataSource: posts
                })

                await server.post(apis.post.collect(data.item.id), {})
                console.log('收藏操作成功');

            } catch (err) {
                console.log(err);
                throw err
            }
        }

    }

    return (
        <ScreenBase
            onReload={getDataSource}
            nothingPage={
                !state.dataSource.length
                    ? {
                          title: 'Nothing here',
                          picture: require('../../../assets/images/status/nothing.png'),
                    }
                    : undefined
            }
        >
            <FlatList
                data={state.dataSource}
                removeClippedSubviews={true}
                keyExtractor={item => item.id}
                ListFooterComponent={() => loadMore()}
                onEndReached={() => onLoadMoreData(state.hasMoreData)}
                refreshControl={
                    <RefreshControl
                        refreshing={state.refreshing}
                        onRefresh={onRefreshData}
                    />
                }
                renderItem={(data: any) => (
                    <PostItem
                        postItem={data.item}
                        onPressDetail={props.onPressDetail}
                        onPressPicture={onPressPicture}
                        onPressComment={onPressComment}
                        onPressCollection={() => onPressCollection(data)}
                        onPressPersonal={props.onPressPersonal}
                    />
                )}

            />

            <AwePicturePreview
                visible={state.pictureVisible}
                onClick={() => setState({pictureVisible: false})}
                imageUrls={state.pictureList}
                startIndex={state.pictureStartIndex}
            />

            <PostCommentSheet
                onPressAvatar={props.onPressPersonal}
                visible={state.commentVisible}
                onClose={() => setState({commentVisible: false})}
            />

        </ScreenBase>
    );
};

export default PostList;
