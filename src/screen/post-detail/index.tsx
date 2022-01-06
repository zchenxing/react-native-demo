import React from 'react';
import {
    FlatList,
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import {NavigateProps} from '../../interface';
import PostContent from './post-content';
import ScreenBase from '../components/screen-base';
import {useSetState} from 'ahooks';
import CommentItem from '../components/post-comments-sheet/comment-item';
import {themeColor} from '../../assets/styles';
import AweKeyboard from '../../components/awe-keyboard';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import UserNavigator from '../components/user-navigator';
import {INTELINK_SCREEN_NAME} from '../../routes/screen-name';
import {CommentProps, PostContentProps} from '../../interface/work';
import {useCommentDataStore, usePostListDataStore} from '../../store/provider';
import {ReplyType} from '../components/post-comments-sheet/type';
import {observer} from 'mobx-react';
import PastCard from './post-card';
import WorkHelp from '../../help/work';
import {PostType, UserEventType} from '../../enum';
import {AnimalCardType} from '../components/animal-card/type';
import IconFont from '../../assets/iconfont';
import PostDetailFooter from './list-footer';
import QuestDrag from './quest-drag';
import CommentFooter from './comment-footer';
import PostDetailComment from './comments';

interface IState {
    postDetail: PostContentProps | null;
    commentTotal: number;
    followStatus: boolean;
    followLoading: boolean;
    isCollection: boolean;
    keyboardVisible: boolean;
    scrollEnabled: boolean;
    hasAccept: boolean;
    initLoading: boolean;
}

const PostDetailScreen: React.FC<NavigateProps> = (props: NavigateProps) => {
    const flatListRef = React.useRef<any>(null);
    const totalRow = React.useRef<any>(null);
    const {postId, rowIndex, fromListId} = props.route.params;

    const {postStoreData, setPostStoreData, onCollectPost} =
        usePostListDataStore();
    const {
        commentStoreData,
        contentText,
        setContentText,
        getCommentData,
        commentMoreLoad,
        replyMoreLoad,
        sendCommentToPost,
        sendReplyToComment,
        currentReplyData,
        setCurrentReplyData,
        getMoreReplies,
        onDeleteCommentReply,
        resetCommentData,
    } = useCommentDataStore();

    const [state, setState] = useSetState<IState>({
        postDetail: null,
        commentTotal: 0,
        followStatus: false,
        followLoading: false,
        isCollection: false,
        keyboardVisible: false,
        scrollEnabled: true,
        hasAccept: false,
        initLoading: true,
    });

    React.useEffect(() => {
        const detail: PostContentProps = postStoreData[fromListId][rowIndex];

        setState({
            isCollection: WorkHelp.userEventExist(
                detail.user_events,
                UserEventType.Collection,
            ).isExist,
            postDetail: detail,
        });

        getComments();

        return () => resetCommentData(fromListId);
    }, []);

    const getComments = async () => {
        await getCommentData(postId, fromListId);
        setState({
            initLoading: false,
        });
    };

    const onChangeFollow = () => {
        setState({
            followLoading: true,
        });
        setTimeout(() => {
            setState({
                followLoading: false,
                followStatus: !state.followStatus,
            });
        }, 1000);
    };

    const onPressEditComment = () => {
        setState({
            keyboardVisible: true,
        });
    };

    const onLoadMoreData = async () => {
        // 如果判断有更多数据，才能加载更多
        if (commentMoreLoad.hasMoreData && !commentMoreLoad.moreLoading) {
            await getCommentData(postId, '', true);
        }
    };

    const onPressAvatar = React.useCallback((userId: string) => {
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_PERSONAL, {
            userId,
        });
    }, []);

    /**
     * 获取更多回复数据
     * @param row
     */
    const getReplies = React.useCallback(async (row: any) => {
        await getMoreReplies(row.index, row.item, fromListId);
    }, []);

    /**
     * 回复消息 显示键盘
     * @param replyType
     * @param comment
     * @param commentRow
     */
    const onPressReply = React.useCallback(
        (replyType: ReplyType, comment: CommentProps, commentRow: any) => {
            setContentText('');
            setCurrentReplyData({
                mainCommentIndex: commentRow.index,
                commentId: commentRow.item.id,
                replyNickname: comment.user_info.nickname,
                replyId: replyType === ReplyType.Reply ? comment.id : '',
            });

            setState({
                keyboardVisible: true,
            });
        },
        [],
    );

    /**
     * 关闭键盘
     */
    const onCloseKeyboard = () => {
        // 如果是回复某条消息，那么关闭键盘
        if (currentReplyData) {
            setContentText('');
            setCurrentReplyData(null);
        }
        setState({
            keyboardVisible: false,
        });
    };

    /**
     * 点击发送消息
     */
    const onPressSend = () => {
        if (currentReplyData) {
            replyToCommentOrReply();
        } else {
            replyToPost();
        }
    };

    /**
     * 回复给帖子
     */
    const replyToPost = async () => {
        try {
            await sendCommentToPost(fromListId);
            postStoreData[fromListId][rowIndex].total_comment += 1;
            setPostStoreData(fromListId, postStoreData[fromListId]);

            Keyboard.dismiss();
        } catch (err) {}
    };

    /**
     * 回复评论
     */
    const replyToCommentOrReply = async () => {
        try {
            await sendReplyToComment(fromListId);
            Keyboard.dismiss();
            setState({
                keyboardVisible: false,
            });
        } catch (err) {}
    };

    /**
     * 收藏 / 取消收藏
     */
    const onCollection = async () => {
        try {
            setState({
                isCollection: !state.isCollection,
            });

            await onCollectPost(postId, rowIndex, fromListId);
        } catch (err) {
            setState({
                isCollection: !state.isCollection,
            });
        }
    };

    /**
     * 删除评论
     * @param type
     * @param commentId
     * @param replyId
     */
    const onPressDelete = React.useCallback(
        async (type: ReplyType, commentId: string, replyId?: string) => {
            await onDeleteCommentReply(fromListId, type, commentId, replyId);
            if (type === ReplyType.Comment) {
                postStoreData[fromListId][rowIndex].total_comment -= 1;
                setPostStoreData(fromListId, postStoreData[fromListId]);
            }
        },
        [],
    );

    return (
        <SafeAreaProvider>
            <UserNavigator
                isFollow={state.followStatus}
                userInfo={state.postDetail?.user_info}
                followLoading={state.followLoading}
                goBack={props.navigation.goBack}
                onChangeFollow={onChangeFollow}
            />

            <ScreenBase>
                {state.postDetail && (
                    <View style={{flex: 1}}>
                        <FlatList
                            scrollEnabled={state.scrollEnabled}
                            ref={flatListRef}
                            data={[
                                0,
                                1,
                                2,
                                ...(commentStoreData[fromListId] || []),
                            ]}
                            ListFooterComponent={
                                <PostDetailFooter
                                    initLoading={state.initLoading}
                                    total={state.postDetail.total_comment || 0}
                                    moreLoading={commentMoreLoad.moreLoading}
                                    hasMoreData={commentMoreLoad.hasMoreData}
                                    onLoadMoreData={onLoadMoreData}
                                />
                            }
                            onEndReached={onLoadMoreData}
                            renderItem={(row: any) => {
                                if (row.item === 0) {
                                    return (
                                        <PostContent
                                            postType={
                                                state.postDetail?.type ||
                                                PostType.Normal
                                            }
                                            postDetail={state.postDetail}
                                        />
                                    );
                                } else if (row.item === 1) {
                                    // 分享的生物卡片
                                    if (state.postDetail?.biological_card) {
                                        return (
                                            <PastCard
                                                postData={state.postDetail}
                                                animalType={
                                                    AnimalCardType.ShareType
                                                }
                                            />
                                        );
                                    }
                                    // 委托的生物卡片
                                    else if (
                                        state.postDetail &&
                                        state.postDetail.entrust
                                    ) {
                                        return (
                                            <PastCard
                                                postData={state.postDetail}
                                                animalType={
                                                    AnimalCardType.QuestType
                                                }
                                            />
                                        );
                                    } else {
                                        return <></>;
                                    }
                                } else if (row.item === 2) {
                                    return (
                                        <View
                                            style={styles.totalBase}
                                            ref={totalRow}>
                                            <Text style={styles.totalText}>
                                                {state.postDetail
                                                    ?.total_comment || 0}{' '}
                                                comments
                                            </Text>
                                        </View>
                                    );
                                } else {
                                    row.index = row.index - 3;
                                    return (
                                        <PostDetailComment
                                            row={JSON.stringify(row)}
                                            postDetail={state.postDetail}
                                            replyMoreLoad={replyMoreLoad}
                                            getReplies={getReplies}
                                            onPressAvatar={onPressAvatar}
                                            onPressReply={onPressReply}
                                            onPressDelete={onPressDelete}
                                        />
                                    );
                                }
                            }}
                        />
                    </View>
                )}

                <CommentFooter
                    contentText={contentText}
                    isCollection={state.isCollection}
                    onCollection={onCollection}
                    onPressEditComment={onPressEditComment}
                />
            </ScreenBase>

            {state.postDetail?.type === PostType.Entrust && (
                <QuestDrag
                    onPressIn={() => setState({scrollEnabled: false})}
                    onRelease={() => setState({scrollEnabled: true})}
                />
            )}

            <AweKeyboard
                visible={state.keyboardVisible}
                contentText={contentText}
                onChangeText={setContentText}
                onClose={onCloseKeyboard}
                onPressSend={onPressSend}
            />
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    totalBase: {
        borderTopColor: '#f8f8f8',
        borderTopWidth: 10,
        borderBottomColor: '#f3f3f3',
        borderBottomWidth: 1,
        padding: 15,
        paddingTop: 13,
        paddingBottom: 13,
    },
    totalText: {
        fontSize: 13,
        color: themeColor,
    },
});

export default observer(PostDetailScreen);
