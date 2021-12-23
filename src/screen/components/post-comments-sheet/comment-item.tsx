import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {avatarUrl} from '../../../mock';
import Utils from '../../../help';
import {PostCommentsItemProps, ReplyType} from './type';
import {themeColor} from '../../../assets/styles';
import {useSetState} from 'ahooks';
import {isIOS} from '../../../config/contant';
import {useLanguage} from '../../../language';
import {CommentProps} from '../../../interface/work';
import server from '../../../network';
import apis from '../../../network/apis';
import apiConfig from '../../../network/config';

interface IState {
    // 加载更多回复
    moreLoading: boolean;
    // 回复列表
    repliesList: CommentProps[];
    // 回复消息数
    repliesTotal: number;
    repliesPage: number;
}

const CommentItem: React.FC<PostCommentsItemProps> = (
    props: PostCommentsItemProps,
) => {
    const [state, setState] = useSetState<IState>({
        moreLoading: false,
        repliesList: [],
        repliesTotal: 0,
        repliesPage: 1,
    });

    React.useEffect(() => {
        if (props.commentDetail.replies) {
            setState({
                repliesTotal: props.commentDetail.total_reply,
                repliesList: props.commentDetail.replies,
            });
        }
    }, []);

    /**
     * 获取更多回复
     */
    const getMoreReplies = async () => {
        try {
            setState({
                moreLoading: true,
            });
            const res = await server.get(
                apis.comment.replyList(
                    props.commentDetail.id,
                    state.repliesPage,
                ),
                apiConfig.pageToken(),
            );

            setState({
                repliesList: res.data,
                repliesPage: state.repliesPage + 1,
                moreLoading: false,
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <TouchableHighlight
                onPress={() =>
                    props.onPressReply(
                        ReplyType.ReplyToComment,
                        props.commentDetail,
                    )
                }
                underlayColor={'#fafafa'}>
                <View style={styles.container}>
                    <TouchableHighlight
                        onPress={props.onPressAvatar}
                        underlayColor={'none'}>
                        <FastImage
                            style={styles.avatar}
                            source={{uri: avatarUrl}}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                    </TouchableHighlight>

                    <View style={[styles.rightView]}>
                        <View style={styles.postHeader}>
                            <View style={styles.nameBase}>
                                <Text style={{color: '#999'}}>
                                    {props.commentDetail.user_info.nickname}
                                </Text>
                                {props.isAuthor && (
                                    <View style={styles.authorBase}>
                                        <Text style={styles.author}>
                                            {useLanguage.author}
                                        </Text>
                                    </View>
                                )}
                            </View>
                            <Text style={styles.postTime}>
                                {Utils.getPostTime(
                                    props.commentDetail.created_at,
                                )}
                            </Text>
                        </View>

                        <Text>
                            {
                                props.commentDetail.target_user_info &&
                                props.commentDetail.target_user_id !== props.mainCommentUserId && (
                                    <Text>
                                        {useLanguage.reply_to}
                                        <Text style={{color: '#aaa'}}>
                                            {
                                                props.commentDetail.target_user_info.nickname
                                            }
                                        </Text>
                                        {':  '}
                                    </Text>
                                )
                            }
                            {props.commentDetail.content}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>

            {state.repliesList.length ? (
                <View style={{paddingLeft: 40}}>
                    {state.repliesList.map(data => (
                        <CommentItem
                            mainCommentUserId={props.mainCommentUserId}
                            key={data.id}
                            commentDetail={data}
                            isAuthor={
                                props.commentDetail.user_id === data.user_id
                            }
                            onPressAvatar={props.onPressAvatar}
                            onPressReply={() =>
                                props.onPressReply(ReplyType.ReplyToReply, data)
                            }
                        />
                    ))}

                    {state.repliesTotal > state.repliesList.length && (
                        <TouchableHighlight
                            style={styles.moreReplies}
                            onPress={getMoreReplies}
                            underlayColor={'none'}>
                            {!state.moreLoading ? (
                                <Text style={styles.moreRepliesText}>
                                    View more replies
                                </Text>
                            ) : (
                                <Text style={styles.moreRepliesText}>
                                    <ActivityIndicator />
                                    Load more
                                </Text>
                            )}
                        </TouchableHighlight>
                    )}
                </View>
            ) : (
                <></>
            )}

            {props.showSeparator && <View style={styles.separator} />}
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
        width: 140,
        marginLeft: 30,
        paddingBottom: 10,
    },
    moreRepliesText: {
        paddingLeft: 10,
        color: themeColor,
        lineHeight: isIOS ? 22 : 17,
    },
});

export default React.memo(CommentItem);
