import React from 'react';
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    TouchableHighlight,
    Text,
    View,
    DeviceEventEmitter,
} from 'react-native';
import PostItem from '../post-item';
import AwePicturePreview from '../../../components/awe-picture-preview';
import PostCommentSheet from '../post-comments-sheet';
import {useLanguage} from '../../../language';
import {useSetState} from 'ahooks';
import {PostListProps} from './type';
import {PostContentProps} from '../../../interface/work';
import server from '../../../network';
import apis from '../../../network/apis';
import apiConfig from '../../../network/config';
import ScreenBase from '../screen-base';
import {EventEmitterName} from '../../../config/contant';
import {useNetInfo} from '@react-native-community/netinfo';
import {PostUserEventType} from '../../../enum';
import AweKeyboard from '../../../components/awe-keyboard';
import Toast from 'react-native-simple-toast';
import {usePostListDataStore} from '../../../store/provider';
import {observer} from 'mobx-react';
import dayjs from 'dayjs';

interface IState {
    refreshing: boolean;
    moreLoading: boolean;
    hasMoreData: boolean;
    refreshTime: number;
    followLoading: boolean

    // 首次评论的事件
    firstKeyboardVisible: boolean;
    firstContentText: string;
    currentPost: PostContentProps | null;
    currentRowIndex: number;

    pictureVisible: boolean;
    pictureStartIndex: number;
    pictureList: any[];
    commentVisible: boolean;
}

const PostList: React.FC<PostListProps> = (props: PostListProps) => {
    const netInfo = useNetInfo();
    const {postStoreData, setPostStoreData} = usePostListDataStore();
    const listRef = React.useRef<any>(null);

    const [state, setState] = useSetState<IState>({
        refreshing: true,
        moreLoading: false,
        hasMoreData: true,
        refreshTime: 0,
        followLoading: false,

        firstKeyboardVisible: false,
        firstContentText: '',
        currentPost: null,
        currentRowIndex: -1,

        pictureVisible: false,
        pictureStartIndex: 0,
        pictureList: [],
        commentVisible: false,
    });

    React.useEffect(() => {
        if (state.refreshing) {
            onLoadData(false);
        }

        // 监听是否发布了新的帖子
        const eventEmitter = DeviceEventEmitter.addListener(
            EventEmitterName.RefreshHome,
            () => onLoadData(true),
        );

        return () => eventEmitter.remove();
    }, [state.refreshing]);

    const getDataSource = async (id?: string) => {
        try {
            const res = await server.get(
                apis.post.list(id),
                apiConfig.pageToken(),
            );

            // 添加 event_types 字段，用于判断是否存在用户事件
            const results: PostContentProps[] = res.data.map((data: any) => {
                const event_types = data.user_events
                    ? data.user_events.map((event: any) => event.event_types)
                    : [];

                return {
                    ...data,
                    event_types,
                };
            });

            return Promise.resolve(results);
        } catch (err) {
            return Promise.reject(err);
        }
    };

    /**
     * 加载数据
     * @param scrollToTop
     */
    const onLoadData = async (scrollToTop: boolean) => {
        try {
            const data = await getDataSource();

            setPostStoreData(data);

            setState({
                refreshTime: dayjs().valueOf(),
                refreshing: false,
            });

            if (scrollToTop) {
                listRef.current.scrollToOffset({
                    offset: 0,
                    animated: true,
                });
            }
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
                moreLoading: true,
            });

            try {
                const _id = postStoreData[postStoreData.length - 1].id;
                const data = await getDataSource(_id);
                if (data.length) {
                    setPostStoreData([...postStoreData, ...data]);

                    setState({
                        refreshTime: dayjs().valueOf(),
                        moreLoading: false,
                        hasMoreData: true,
                    });
                } else {
                    setState({
                        moreLoading: false,
                        hasMoreData: false,
                    });
                }
            } catch (err) {}
        }
    };

    /**
     * 点击"没有更多数据"，手动加载更多数据
     */
    const handleNoMoreData = () => {
        setState({
            moreLoading: true,
            hasMoreData: true,
        });

        onLoadMoreData(true);
    };

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
                {!state.hasMoreData && (
                    <TouchableHighlight
                        style={{padding: 10}}
                        onPress={handleNoMoreData}>
                        <Text style={{textAlign: 'center'}}>没有更多数据</Text>
                    </TouchableHighlight>
                )}
            </>
        );
    };

    /**
     * 浏览图片
     * @param pictures
     * @param startIndex
     */
    const onPressPicture = (pictures: any[], startIndex: number) => {
        const list = pictures.map(picture => picture.uri);

        setState({
            pictureVisible: true,
            pictureStartIndex: startIndex,
            pictureList: list,
        });
    };


    /**
     * 执行关注
     * @param row
     * @param callback
     */
    const onPressFollow = async (row: any, callback: () => void) => {

        try {

            setState({ followLoading: true })

            await server.post(apis.user.follow(row.item.id))

            const index = postStoreData[row.index].event_types.indexOf(
                PostUserEventType.Follow,
            );

            if (index === -1) {
                postStoreData[row.index].event_types.push(
                    PostUserEventType.Follow,
                );
            } else {
                postStoreData[row.index].event_types.splice(index, 1);
            }

            callback()
            setPostStoreData(postStoreData)

        } catch (err) {
            callback()
            console.log(err);
        }
    };

    /**
     * 查看评论
     */
    const onPressComment = (row: any) => {
        // 如果有评论，就打开评论
        // 没有评论就截止回复
        if (row.item.total_comment) {
            setState({
                currentPost: row.item,
                commentVisible: true,
                currentRowIndex: row.index,
            });
        } else {
            // 判断是够连续查看同一条帖子的评论，如果是就不清除评论内容
            if (row.item.id === state.currentPost?.id) {
                setState({
                    currentRowIndex: row.index,
                    firstKeyboardVisible: true,
                });
            } else {
                setState({
                    currentRowIndex: row.index,
                    firstKeyboardVisible: true,
                    firstContentText: '',
                    currentPost: row.item,
                });
            }
        }
    };

    /**
     * 点击收藏 | 取消收藏
     * @param row      具体某行的数据
     * @param collect   是否收藏
     */
    const onPressCollection = async (row: any, collect: boolean) => {
        if (netInfo.type !== 'none') {
            try {
                await server.post(apis.post.collect(row.item.id), {});
                const event_types = [...postStoreData[row.index].event_types];

                // 进行收藏操作，在event_types中添加收藏
                if (collect) {
                    postStoreData[row.index].event_types = [
                        ...new Set([
                            ...event_types,
                            PostUserEventType.Collection,
                        ]),
                    ];
                }
                // 取消收藏
                else {
                    const deleteIndex = event_types.indexOf(
                        PostUserEventType.Collection,
                    );
                    event_types.splice(deleteIndex, 1);
                    postStoreData[row.index].event_types = event_types;
                }

                setPostStoreData(postStoreData);

                setState({
                    refreshTime: dayjs().valueOf(),
                })
            } catch (err) {
                console.log(err);
                throw err;
            }
        }
    };

    /**
     * 发评论
     */
    const onSendComment = async () => {
        try {
            await server.post(apis.post.comment.push(state.currentPost?.id), {
                content: state.firstContentText,
            });

            if (state.currentRowIndex > -1) {
                // 直接修改列表数据
                postStoreData[state.currentRowIndex].total_comment = 1;

                setState({
                    refreshTime: dayjs().valueOf(),
                    firstContentText: '',
                    currentPost: null,
                    firstKeyboardVisible: false,
                });
            }

            Toast.show('消息发送成功');
        } catch (err) {}
    };

    return (
        <ScreenBase
            onReload={getDataSource}
            nothingPage={
                !postStoreData.length
                    ? {
                          title: 'Nothing here',
                          picture: require('../../../assets/images/status/nothing.png'),
                      }
                    : undefined
            }>
            <FlatList
                ref={listRef}
                data={postStoreData}
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
                renderItem={(row: any) => (
                    <PostItem
                        postItem={postStoreData[row.index]}
                        onPressFollow={(callback) => onPressFollow(row, callback)}
                        onPressDetail={props.onPressDetail}
                        onPressPicture={onPressPicture}
                        onPressComment={() => onPressComment(row)}
                        onPressCollection={follow =>
                            onPressCollection(row, follow)
                        }
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
                rowIndex={state.currentRowIndex}
                onPressAvatar={props.onPressPersonal}
                visible={state.commentVisible}
                onClose={() => setState({commentVisible: false})}
            />

            <AweKeyboard
                visible={state.firstKeyboardVisible}
                contentText={state.firstContentText}
                onChangeText={firstContentText => setState({firstContentText})}
                onClose={() => setState({firstKeyboardVisible: false})}
                onPressSend={onSendComment}
            />
        </ScreenBase>
    );
};

export default observer(PostList);
