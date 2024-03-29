import React from 'react';
import {
    ActivityIndicator,
    Keyboard,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import {screenHeight, screenWidth} from '../../../config/contant';
import {Image} from 'react-native-elements';
import {useLanguage} from '../../../language';
import AweKeyboard from '../../../components/awe-keyboard';
import {PostCommentProps, ReplyType} from './type';
import CommentItem from './comment-item';
import {themeColor} from '../../../assets/styles';
import BottomSheet, {BottomSheetVirtualizedList} from '@gorhom/bottom-sheet';
import {CommentProps} from '../../../interface/work';
import dayjs from 'dayjs';
import {observer} from 'mobx-react';
import {
    useCommentDataStore,
    usePostListDataStore,
    useSelfDataStore,
} from '../../../store/provider';
import AweLoadMore from '../../../components/awe-load-more';
import {localImages} from '../../../assets/images';

const PostCommentSheet: React.FC<PostCommentProps> = (
    props: PostCommentProps,
) => {
    const {selfInfoData} = useSelfDataStore();
    const {postStoreData, setPostStoreData} = usePostListDataStore();
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

    const actionSheetRef = React.createRef<any>();
    const commentListRef = React.useRef<any>(null);
    const currentPostId = React.useRef<string>('');
    // 最近一次打开事件
    const latestOpenTimestamp = React.useRef<any>(null);

    const [keyboardVisible, setKeyboardVisible] = React.useState(false);

    React.useEffect(() => {
        if (props.visible) {
            // 重复打开帖子的评论不需要重新请求
            // 同一个帖子打开的间隔超过20秒
            // 都会触发重新请求
            if (
                postStoreData[props.listId][props.rowIndex].id !==
                    currentPostId.current ||
                dayjs().valueOf() - latestOpenTimestamp.current > 10000
            ) {
                currentPostId.current =
                    postStoreData[props.listId][props.rowIndex].id;
                latestOpenTimestamp.current = dayjs().valueOf();

                // 先重置数据
                resetCommentData(props.listId);
                // 再重新请求数据
                initData();
            }
            actionSheetRef.current && actionSheetRef.current.snapToIndex(1);
        } else {
            actionSheetRef.current && actionSheetRef.current.snapToIndex(-1);
        }
    }, [props.visible]);

    // callbacks
    const handleSheetChanges = React.useCallback((index: number) => {
        if (index === 0) {
            onClose();
        }
    }, []);

    const initData = async () => {
        try {
            const res = await getCommentData(
                currentPostId.current,
                props.listId,
            );
            postStoreData[props.listId][props.rowIndex].total_comment =
                parseInt(res.headers['x-result-count'], 10);

            setPostStoreData(props.listId, postStoreData[props.listId]);
        } catch (err) {}
    };

    const onLoadMoreData = () => {
        if (commentMoreLoad.hasMoreData) {
            getCommentData(currentPostId.current, props.listId, true);
        }
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
            replyId: replyType === ReplyType.ReplyToReply ? comment.id : '',
        });

        setKeyboardVisible(true);
    };

    /**
     * 回复帖子
     */
    const handleReplyToPost = () => {
        setKeyboardVisible(true);
    };

    /**
     * 发送评论
     */
    const onPressSend = () => {
        if (currentReplyData) {
            // 回复评论
            replyToCommentOrReply();
        } else {
            // 回复帖子
            replyToPost();
        }
    };

    /**
     * 回复给帖子
     */
    const replyToPost = async () => {
        try {
            await sendCommentToPost(props.listId);
            // 评论数+1
            postStoreData[props.listId][props.rowIndex].total_comment += 1;

            Keyboard.dismiss();
            // 滚动到第一行显示最新评论
            commentListRef.current.scrollToOffset({
                offset: 0,
                animated: true,
            });

            setKeyboardVisible(false);
        } catch (err) {
            console.log(err);
        }
    };

    /**
     * 回复评论
     */
    const replyToCommentOrReply = async () => {
        try {
            await sendReplyToComment(props.listId);
            Keyboard.dismiss();
            setKeyboardVisible(false);
        } catch (err) {}
    };

    /**
     * 获取更多回复数据
     * @param row
     */
    const getReplies = async (row: any) => {
        await getMoreReplies(row.index, row.item, props.listId);
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
        setKeyboardVisible(false);
    };

    const onClose = (animatedBack?: boolean) => {
        // 点击背景展示收回的动画
        animatedBack && actionSheetRef.current.snapToPosition(1);

        setContentText('');
        setCurrentReplyData(null);

        setTimeout(() => {
            props.onClose();
        }, 100);
    };

    return (
        <>
            {props.visible && (
                <TouchableHighlight
                    underlayColor={'none'}
                    style={styles.cover}
                    onPress={() => onClose(true)}>
                    <View />
                </TouchableHighlight>
            )}

            <BottomSheet
                ref={actionSheetRef}
                index={-1}
                snapPoints={[1, screenHeight * 0.8]}
                onChange={handleSheetChanges}
                handleComponent={() => (
                    <View style={styles.sheetHeader}>
                        <Text style={{color: '#777'}}>
                            {(postStoreData[props.listId] &&
                                postStoreData[props.listId][props.rowIndex]
                                    ?.total_comment) ||
                                0}{' '}
                            comments
                        </Text>
                    </View>
                )}>
                {props.visible && commentStoreData[props.listId] ? (
                    <BottomSheetVirtualizedList
                        ref={commentListRef}
                        style={styles.sheetContent}
                        getItemCount={() =>
                            commentStoreData[props.listId].length
                        }
                        getItem={(data, index) => data[index]}
                        data={commentStoreData[props.listId]}
                        keyExtractor={(item: any) => item.id}
                        onEndReached={onLoadMoreData}
                        ListFooterComponent={
                            <AweLoadMore
                                loading={commentMoreLoad.moreLoading}
                                hasMoreData={commentMoreLoad.hasMoreData}
                                handleNoMoreData={onLoadMoreData}
                            />
                        }
                        renderItem={(row: any) => {
                            return (
                                <CommentItem
                                    commentIndex={row.index}
                                    mainCommentUserId={row.item.user_id}
                                    moreLoading={
                                        row.index === replyMoreLoad.rowIndex &&
                                        replyMoreLoad.loading
                                    }
                                    isAuthor={
                                        postStoreData[props.listId][
                                            props.rowIndex
                                        ].user_id === row.item.user_id
                                    }
                                    getMoreReplies={() => getReplies(row)}
                                    commentDetail={row.item}
                                    showSeparator={true}
                                    onPressAvatar={() =>
                                        props.onPressAvatar(row.item.user_id)
                                    }
                                    onPressReply={(type, comment) =>
                                        onPressReply(type, comment, row)
                                    }
                                />
                            );
                        }}
                    />
                ) : (
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <ActivityIndicator />
                    </View>
                )}

                <TouchableHighlight
                    underlayColor={'none'}
                    onPress={handleReplyToPost}>
                    <View style={styles.sheetFooter}>
                        <Image
                            style={styles.avatar}
                            defaultSource={localImages.defaultAvatar}
                            source={
                                selfInfoData?.avatar
                                    ? {uri: selfInfoData.avatar}
                                    : localImages.defaultAvatar
                            }
                        />
                        <View style={styles.submitText}>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode={'tail'}
                                style={{
                                    color: contentText ? '#333' : '#ddd',
                                }}>
                                {contentText
                                    ? contentText
                                    : useLanguage.say_something}
                            </Text>
                        </View>
                        <TouchableHighlight
                            underlayColor={'none'}
                            onPress={onPressSend}>
                            <View
                                style={[
                                    styles.submitButton,
                                    {
                                        backgroundColor: themeColor,
                                        opacity: contentText ? 1 : 0.7,
                                    },
                                ]}>
                                <Text style={{color: '#fff'}}>
                                    {useLanguage.comment}
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </TouchableHighlight>
            </BottomSheet>

            <AweKeyboard
                replyUser={currentReplyData}
                visible={keyboardVisible}
                contentText={contentText}
                onClose={onCloseKeyboard}
                onChangeText={setContentText}
                onPressSend={onPressSend}
            />
        </>
    );
};

const styles = StyleSheet.create({
    cover: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: -120,
        bottom: 0,
        backgroundColor: 'rgba(1, 1, 1, .3)',
    },
    sheetView: {
        width: screenWidth,
        height: screenHeight * 0.7,
        backgroundColor: '#fff',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        position: 'absolute',
        left: 0,
        bottom: 4,
    },
    sheetHeader: {
        width: screenWidth,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sheetContent: {
        flex: 1,
        padding: 20,
        paddingTop: 10,
    },
    sheetFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 25,
        paddingLeft: 20,
        paddingRight: 10,
        borderTopWidth: 1,
        borderTopColor: '#ebebeb',
        backgroundColor: '#fff',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 30,
        marginRight: 10,
    },
    submitText: {
        flex: 1,
        padding: 10,
        paddingRight: 5,
        backgroundColor: '#FAFAFA',
        borderRadius: 20,
    },
    submitButton: {
        height: 35,
        justifyContent: 'center',
        marginLeft: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 20,
    },
});

export default React.memo(observer(PostCommentSheet));
