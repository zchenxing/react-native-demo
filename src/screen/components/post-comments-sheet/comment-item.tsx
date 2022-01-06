import React from 'react';
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Utils from '../../../help';
import {PostCommentsItemProps, ReplyType} from './type';
import {themeColor} from '../../../assets/styles';
import {isIOS} from '../../../config/contant';
import {useLanguage} from '../../../language';
import {localImages} from '../../../assets/images';
import CommentActionSheet from '../comment-action';
import {useSelfDataStore} from '../../../store/provider';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-simple-toast';
import {CommentProps} from '../../../interface/work';

const CommentItem: React.FC<PostCommentsItemProps> = (
    props: PostCommentsItemProps,
) => {
    const {selfInfoData} = useSelfDataStore();
    const [visible, setVisible] = React.useState(false);

    // 保持数据更新
    const commentDetail: CommentProps = {
        ...props.commentDetail,
        replies: props.commentDetail.replies || [],
    };

    const onLongPress = () => {
        setVisible(true);
    };

    /**
     * 回复评论
     */
    const onReply = () => {
        props.onPressReply(ReplyType.Comment, commentDetail);
    };

    /**
     * 粘贴到剪切板
     */
    const onCopy = () => {
        Clipboard.setString(commentDetail.content);
        Toast.showWithGravity(useLanguage.copy_to_clipboard, 100, Toast.CENTER);
    };

    /**
     * 删除评论
     */
    const onDeleteComment = () => {
        Alert.alert(useLanguage.reminder, useLanguage.confirm_delete_comment, [
            {
                text: useLanguage.cancel,
                onPress: () => {},
                style: 'cancel',
            },
            {
                text: useLanguage.delete,
                onPress: () =>
                    props.onPressDelete(ReplyType.Comment, commentDetail.id),
            },
        ]);
    };


    return (
        <>
            <TouchableHighlight
                onPress={onReply}
                onLongPress={() => onLongPress()}
                underlayColor={'#fafafa'}>
                <View style={styles.container}>
                    <TouchableHighlight
                        onPress={props.onPressAvatar}
                        underlayColor={'none'}>
                        <FastImage
                            style={styles.avatar}
                            source={
                                commentDetail.user_info?.avatar
                                    ? {
                                          uri: commentDetail.user_info?.avatar
                                              .url_thumb,
                                      }
                                    : localImages.defaultAvatar
                            }
                            resizeMode={FastImage.resizeMode.cover}
                        />
                    </TouchableHighlight>

                    <View style={[styles.rightView]}>
                        <View style={styles.postHeader}>
                            <View style={styles.nameBase}>
                                <Text style={{color: '#999'}}>
                                    {commentDetail.user_info.nickname}
                                </Text>

                                {props.postUserId === commentDetail.user_id && (
                                    <View style={styles.authorBase}>
                                        <Text style={styles.author}>
                                            {useLanguage.author}
                                        </Text>
                                    </View>
                                )}
                            </View>
                            <Text style={styles.postTime}>
                                {Utils.getPostTime(commentDetail.created_at)}
                            </Text>
                        </View>

                        <Text>
                            {commentDetail.target_user_info &&
                                commentDetail.target_user_id !==
                                    props.mainCommentUserId && (
                                    <Text>
                                        {useLanguage.reply_to}
                                        <Text style={{color: '#aaa'}}>
                                            {
                                                commentDetail.target_user_info
                                                    .nickname
                                            }
                                        </Text>
                                        {':  '}
                                    </Text>
                                )}
                            {commentDetail.content}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>

            <View style={{paddingLeft: 40}}>
                {commentDetail.replies &&
                    commentDetail.replies.map(data => (
                        <CommentItem
                            key={data.id}
                            postUserId={props.postUserId}
                            mainCommentUserId={props.mainCommentUserId}
                            commentDetail={data}
                            onPressAvatar={props.onPressAvatar}
                            onPressReply={() =>
                                props.onPressReply(ReplyType.Reply, data)
                            }
                            onPressDelete={() => {
                                props.onPressDelete(
                                    ReplyType.Reply,
                                    commentDetail.id,
                                    data.id,
                                );
                            }}
                        />
                    ))}

                {commentDetail.total_reply &&
                commentDetail.replies &&
                commentDetail.replies.length < commentDetail.total_reply ? (
                    <TouchableHighlight
                        style={styles.moreReplies}
                        onPress={props.getMoreReplies}
                        underlayColor={'#f8f8f8'}>
                        {!props.moreLoading ? (
                            <Text style={styles.moreRepliesText}>
                                {useLanguage.view_more_replies}
                            </Text>
                        ) : (
                            <>
                                <ActivityIndicator style={{marginRight: 10}} />
                                <Text style={styles.moreRepliesText}>
                                    {useLanguage.load_more}
                                </Text>
                            </>
                        )}
                    </TouchableHighlight>
                ) : (
                    <></>
                )}
            </View>

            {props.showSeparator && <View style={styles.separator} />}
            {
                // 避免重复创建实例
                visible && (
                    <CommentActionSheet
                        visible={visible}
                        showDelete={selfInfoData?.id === commentDetail.user_id}
                        onCopy={onCopy}
                        onReply={onReply}
                        onDelete={onDeleteComment}
                        onClose={() => setVisible(false)}
                    />
                )
            }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: 20,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 32,
    },
    nameBase: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    authorBase: {
        backgroundColor: '#EBEBEB',
        borderRadius: 10,
        marginLeft: 5,
        padding: 1,
        paddingLeft: 5,
        paddingRight: 5,
    },
    author: {
        color: '#fff',
        fontSize: 12,
    },
    rightView: {
        flex: 1,
        marginRight: 10,
        marginLeft: 10,
        paddingBottom: 15,
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    postTime: {
        color: '#999',
        fontSize: 11,
    },
    separator: {
        flex: 1,
        height: 1,
        backgroundColor: '#eee',
        marginLeft: 35,
    },
    moreReplies: {
        width: 160,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    moreRepliesText: {
        color: themeColor,
        lineHeight: isIOS ? 22 : 17,
    },
});

export default React.memo(CommentItem);
