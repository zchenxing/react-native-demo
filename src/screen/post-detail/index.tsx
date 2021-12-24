import React from 'react';
import {
    ActivityIndicator,
    FlatList, Keyboard,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from "react-native";
import {NavigateProps} from '../../interface';
import PostContent from './post-content';
import ScreenBase from '../components/screen-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSetState} from 'ahooks';
import CommentItem from '../components/post-comments-sheet/comment-item';
import {themeColor} from '../../assets/styles';
import AweKeyboard from '../../components/awe-keyboard';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import PostCard from './post-card';
import UserNavigator from '../components/user-navigator';
import { useLanguage } from "../../language";
import { INTELINK_SCREEN_NAME } from "../../routes/screen-name";
import server from '../../network';
import apis from '../../network/apis';
import { CommentProps, PostContentProps } from "../../interface/work";
import { useCommentDataStore, usePostListDataStore } from "../../store/provider";
import { ReplyType } from "../components/post-comments-sheet/type";
import AweLoadMore from '../../components/awe-load-more';
import { observer } from "mobx-react";

interface IState {
    postDetail: PostContentProps | null
    commentTotal: number
    followStatus: boolean;
    followLoading: boolean;
    collection: boolean;
    keyboardVisible: boolean;
}

const PostDetailScreen: React.FC<NavigateProps> = (props: NavigateProps) => {

    const flatListRef = React.useRef<any>(null)
    const { postId, rowIndex } = props.route.params

    const {postStoreData} = usePostListDataStore()
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
        resetCommentData
    } = useCommentDataStore()

    const [state, setState] = useSetState<IState>({
        postDetail: null,
        commentTotal: 0,
        followStatus: false,
        followLoading: false,
        collection: false,
        keyboardVisible: false,
    });


    React.useEffect(() => {

        setState({
            postDetail: postStoreData[rowIndex]
        })

        getComments()

        return () => resetCommentData()
    }, [])


    const getComments = async () => {
        await getCommentData(postId)
    }

    /**
     * 点击生物卡片查看更多
     */
    const onPressAnimalCardMore = (offset: number, isPutAway: boolean) => {
        flatListRef.current.scrollToOffset({
            offset: offset + (isPutAway ? 340 : 0),
            animated: true
        })
    }

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
            await getCommentData(postId, true)
        }
    }

    const onPressAvatar = () => {
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_PERSONAL)
    }

    /**
     * 获取更多回复数据
     * @param row
     */
    const getReplies = async (row: any) => {
        await getMoreReplies(row.index, row.item);
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
        commentRow: any
    ) => {

        setContentText('')
        setCurrentReplyData({
            mainCommentIndex: commentRow.index,
            commentId: commentRow.item.id,
            replyNickname: comment.user_info.nickname,
            replyId: replyType === ReplyType.ReplyToReply ? comment.id : '',
        });

        setState({
            keyboardVisible: true
        })
    }

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
            keyboardVisible: false
        })
    };


    const onPressSend = () => {
        if (currentReplyData) {
            replyToCommentOrReply()
        } else {
            replyToPost()
        }
    }

    /**
     * 回复给帖子
     */
    const replyToPost = async () => {
        try {

            await sendCommentToPost()
            postStoreData[rowIndex].total_comment += 1

        } catch (err) {

        }
    }

    /**
     * 回复评论
     */
    const replyToCommentOrReply = async () => {
        try {
            await sendReplyToComment()
            Keyboard.dismiss();
            setState({
                keyboardVisible: false
            })
        } catch (err) {

        }
    }

    return (
        <SafeAreaProvider>

            <UserNavigator
                isFollow={state.followStatus}
                followLoading={state.followLoading}
                goBack={props.navigation.goBack}
                onChangeFollow={onChangeFollow}
            />

            <ScreenBase>
                {
                    state.postDetail &&
                    <View style={{flex: 1}}>
                        <FlatList
                            ref={flatListRef}
                            data={[0, 1, 2, ...commentStoreData]}
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

                                    return <PostContent postDetail={state.postDetail} />;
                                } else if (row.item === 1) {

                                    return <View></View>
                                    // return <PostCard onPressMore={onPressAnimalCardMore} />
                                } else if (row.item === 2) {

                                    return (
                                        <View style={styles.commentHeader}>
                                            <Text style={styles.commentHeaderTitle}>
                                                {state.postDetail?.total_comment} comments
                                            </Text>
                                        </View>
                                    );
                                } else {
                                    row.index = row.index - 3
                                    return (
                                        <View
                                            style={{
                                                paddingLeft: 20,
                                                paddingRight: 20,
                                            }}>
                                            <CommentItem
                                                commentIndex={row.index}
                                                mainCommentUserId={row.item.user_id}
                                                moreLoading={row.index === replyMoreLoad.rowIndex && replyMoreLoad.loading}
                                                isAuthor={state.postDetail?.user_id === row.item.user_id}
                                                getMoreReplies={() => getReplies(row)}
                                                commentDetail={row.item}
                                                showSeparator={true}
                                                onPressAvatar={onPressAvatar}
                                                onPressReply={(type, comment) =>
                                                    onPressReply(type, comment, row)
                                                }
                                            />
                                        </View>
                                    );
                                }
                            }}
                        />
                    </View>
                }

                <View style={styles.footer}>
                    <TouchableHighlight
                        style={styles.comment}
                        underlayColor={'none'}
                        onPress={onPressEditComment}>
                        <Text numberOfLines={1}>
                            {contentText || 'Say something'}
                        </Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={styles.iconBase}
                        underlayColor={'none'}
                        onPress={() =>
                            setState({
                                collection: !state.collection,
                            })
                        }>
                        {state.collection ? (
                            <Icon
                                name={'star'}
                                style={{fontSize: 20, color: '#FFD575'}}
                            />
                        ) : (
                            <Icon name={'star-o'} style={{fontSize: 20}} />
                        )}
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={styles.iconBase}
                        underlayColor={'none'}
                        onPress={() => console.log('444')}>
                        <Icon name={'share-alt'} style={{fontSize: 20}} />
                    </TouchableHighlight>
                </View>
            </ScreenBase>

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
        paddingBottom: 25,
    },
});

export default observer(PostDetailScreen);
