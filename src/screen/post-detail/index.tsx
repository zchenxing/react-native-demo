import React from 'react';
import {
    FlatList,
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from "react-native";
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
import AweLoadMore from '../../components/awe-load-more';
import {observer} from 'mobx-react';
import PastCard from './post-card';
import WorkHelp from '../../help/work';
import {UserEventType} from '../../enum';
import {AnimalCardType} from '../components/animal-card/type';
import IconFont from '../../assets/iconfont';
import LinearGradient from 'react-native-linear-gradient';
import Draggable from 'react-native-draggable';
import {screenHeight, screenWidth} from '../../config/contant';
import {Card} from 'react-native-shadow-cards';
import { useLanguage } from "../../language";

interface IState {
    postDetail: PostContentProps | null;
    commentTotal: number;
    followStatus: boolean;
    followLoading: boolean;
    isCollection: boolean;
    keyboardVisible: boolean;
    scrollEnabled: boolean;
    hasAccept: boolean
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
        hasAccept: false
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
        if (commentMoreLoad.hasMoreData && !commentMoreLoad.moreLoading) {
            await getCommentData(postId, '', true);
        }
    };

    const onPressAvatar = (userId: string) => {
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_PERSONAL, {
            userId,
        });
    };

    /**
     * 获取更多回复数据
     * @param row
     */
    const getReplies = async (row: any) => {
        await getMoreReplies(row.index, row.item, fromListId);
    };

    /**
     * 回复消息 显示键盘
     * @param replyType
     * @param comment
     * @param commentRow
     */
    const onPressReply = (
        replyType: ReplyType,
        comment: CommentProps,
        commentRow: any,
    ) => {
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
    };

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
                                <AweLoadMore
                                    loading={commentMoreLoad.moreLoading}
                                    hasMoreData={commentMoreLoad.hasMoreData}
                                    handleNoMoreData={onLoadMoreData}
                                />
                            }
                            onEndReached={onLoadMoreData}
                            renderItem={(row: any) => {
                                if (row.item === 0) {
                                    return (
                                        <PostContent
                                            postDetail={state.postDetail}
                                        />
                                    );
                                } else if (row.item === 1) {
                                    if (
                                        state.postDetail &&
                                        state.postDetail.biological_card
                                    ) {
                                        return (
                                            <PastCard
                                                postData={state.postDetail}
                                                animalType={
                                                    AnimalCardType.ShareType
                                                }
                                            />
                                        );
                                    } else if (
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
                                            style={styles.commentHeader}
                                            ref={totalRow}>
                                            <Text
                                                style={
                                                    styles.commentHeaderTitle
                                                }>
                                                {state.postDetail
                                                    ?.total_comment || 0}{' '}
                                                comments
                                            </Text>
                                        </View>
                                    );
                                } else {
                                    row.index = row.index - 3;
                                    return (
                                        <View
                                            style={{
                                                paddingLeft: 20,
                                                paddingRight: 20,
                                            }}>
                                            <CommentItem
                                                commentIndex={row.index}
                                                mainCommentUserId={
                                                    row.item.user_id
                                                }
                                                moreLoading={
                                                    row.index ===
                                                        replyMoreLoad.rowIndex &&
                                                    replyMoreLoad.loading
                                                }
                                                isAuthor={
                                                    state.postDetail
                                                        ?.user_id ===
                                                    row.item.user_id
                                                }
                                                getMoreReplies={() =>
                                                    getReplies(row)
                                                }
                                                commentDetail={row.item}
                                                showSeparator={true}
                                                onPressAvatar={() =>
                                                    onPressAvatar(
                                                        row.item.user_id,
                                                    )
                                                }
                                                onPressReply={(type, comment) =>
                                                    onPressReply(
                                                        type,
                                                        comment,
                                                        row,
                                                    )
                                                }
                                            />
                                        </View>
                                    );
                                }
                            }}
                        />
                    </View>
                )}

                <SafeAreaView>
                    <View style={styles.footer}>
                        <TouchableHighlight
                            style={styles.comment}
                            underlayColor={'none'}
                            onPress={onPressEditComment}>
                            <Text
                                numberOfLines={1}
                                style={{color: contentText ? '#333' : '#aaa'}}>
                                {contentText || 'Say something'}
                            </Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={styles.iconBase}
                            underlayColor={'none'}
                            onPress={onCollection}>
                            {state.isCollection ? (
                                <IconFont
                                    name={'yishoucang'}
                                    size={20}
                                    color={'#FFD575'}
                                />
                            ) : (
                                <IconFont name={'weishoucang'} size={20} />
                            )}
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={styles.iconBase}
                            underlayColor={'none'}
                            onPress={() => console.log('444')}>
                            <IconFont name={'fenxiang'} size={18} />
                        </TouchableHighlight>
                    </View>
                </SafeAreaView>
            </ScreenBase>

            <Draggable
                x={screenWidth - (state.hasAccept ? 140 : 110)}
                y={screenHeight - 150}
                minX={0}
                minY={0}
                maxX={screenWidth}
                maxY={screenHeight}
                onShortPressRelease={() => setState({hasAccept: !state.hasAccept})}
                onPressIn={() => setState({scrollEnabled: false})}
                onRelease={() => setState({scrollEnabled: true})}
            >
                <Card style={styles.shadow}>
                    <LinearGradient
                        colors={['#6FC1CE', '#a2dee6']}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        style={styles.questDetail}>
                        <Text style={{color: '#fff'}}>
                            {state.hasAccept ? useLanguage.quest_detail : useLanguage.accept}
                        </Text>
                    </LinearGradient>
                </Card>

            </Draggable>

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
    comment: {
        flex: 1,
        padding: 10,
        borderRadius: 30,
        backgroundColor: '#f8f8f8',
    },
    iconBase: {
        padding: 8,
    },
    commentHeader: {
        borderTopColor: '#f3f3f3',
        borderTopWidth: 10,
        borderBottomColor: '#f3f3f3',
        borderBottomWidth: 1,
        padding: 15,
        paddingTop: 13,
        paddingBottom: 13,
    },
    commentHeaderTitle: {
        fontSize: 13,
        color: themeColor,
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingLeft: 15,
        paddingRight: 20,
    },
    questDetail: {
        backgroundColor: themeColor,
        height: 40,
        paddingRight: 20,
        paddingLeft: 20,
        borderRadius: 40,
        justifyContent: 'center',
    },
    shadow: {
        borderRadius: 20,
        width: 'auto',
    },
});

export default observer(PostDetailScreen);
