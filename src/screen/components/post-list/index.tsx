import React from 'react';
import {FlatList, RefreshControl, DeviceEventEmitter} from 'react-native';
import PostItem from '../post-item';
import AwePicturePreview from '../../../components/awe-picture-preview';
import PostCommentSheet from '../post-comments-sheet';
import {useSetState} from 'ahooks';
import {PostListProps} from './type';
import {PostContentProps} from '../../../interface/work';
import server from '../../../network';
import apis from '../../../network/apis';
import ScreenBase from '../screen-base';
import {EventEmitterName, PAGE_SIZE} from '../../../config/contant';
import {useNetInfo} from '@react-native-community/netinfo';
import AweKeyboard from '../../../components/awe-keyboard';
import Toast from 'react-native-simple-toast';
import {usePostListDataStore} from '../../../store/provider';
import {observer} from 'mobx-react';
import AweLoadMore from '../../../components/awe-load-more';

interface IState {
    refreshing: boolean;
    moreLoading: boolean;
    hasMoreData: boolean;

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
    const {postStoreData, getPostData, getMorePostData, onCollectPost} =
        usePostListDataStore();
    const listRef = React.useRef<any>(null);

    const [state, setState] = useSetState<IState>({
        refreshing: true,
        moreLoading: false,
        hasMoreData: false,

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
            onLoadData();
        }

        // 监听是否发布了新的帖子
        const eventEmitter = DeviceEventEmitter.addListener(
            EventEmitterName.RefreshHome,
            () => onLoadData(true),
        );

        return () => eventEmitter.remove();
    }, [state.refreshing]);

    /**
     * 加载数据
     * @param scrollToTop
     */
    const onLoadData = async (scrollToTop?: boolean) => {
        try {
            const res = await getPostData(
                {
                    api: props.api,
                    apiParam: props.apiParam || '',
                },
                props.listId,
            );

            setState({
                refreshing: false,
                hasMoreData: res.data.length && res.data.length === PAGE_SIZE,
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
                const res = await getMorePostData(
                    {
                        api: props.api,
                        apiParam: props.apiParam || '',
                    },
                    props.listId,
                );
                setState({
                    moreLoading: false,
                    hasMoreData:
                        res.data.length && res.data.length === PAGE_SIZE,
                });
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
     */
    const onPressCollection = async (row: any) => {
        if (netInfo.type !== 'none') {
            try {
                await onCollectPost(
                    row.item.id,
                    row.index,
                    props.listId,
                );
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
                postStoreData[props.listId][
                    state.currentRowIndex
                ].total_comment = 1;

                setState({
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
            onReload={onLoadData}
            nothingPage={
                postStoreData[props.listId] &&
                !postStoreData[props.listId].length
                    ? {
                          title: 'Nothing here',
                          picture: require('../../../assets/images/status/nothing.png'),
                      }
                    : undefined
            }>
            <FlatList
                ref={listRef}
                data={postStoreData[props.listId]}
                removeClippedSubviews={true}
                keyExtractor={item => item.id}
                ListFooterComponent={
                    <AweLoadMore
                        loading={state.moreLoading}
                        hasMoreData={state.hasMoreData}
                        handleNoMoreData={handleNoMoreData}
                    />
                }
                onEndReached={() => onLoadMoreData(state.hasMoreData)}
                refreshControl={
                    <RefreshControl
                        refreshing={state.refreshing}
                        onRefresh={onRefreshData}
                    />
                }
                renderItem={(row: any) => {
                    return (
                        <PostItem
                            postItem={
                                postStoreData[props.listId][
                                    row.index
                                ]
                            }
                            onPressDetail={post =>
                                props.onPressDetail(post, row.index)
                            }
                            onPressPicture={onPressPicture}
                            onPressComment={() => onPressComment(row)}
                            onPressCollection={() => onPressCollection(row)}
                            onPressPersonal={() =>
                                props.onPressPersonal(row.item.user_id)
                            }
                        />
                    );
                }}
            />

            <AwePicturePreview
                visible={state.pictureVisible}
                onClick={() => setState({pictureVisible: false})}
                imageUrls={state.pictureList}
                startIndex={state.pictureStartIndex}
            />

            <PostCommentSheet
                listId={props.listId}
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
