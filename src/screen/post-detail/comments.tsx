import React from 'react';
import {View} from 'react-native';
import CommentItem from '../components/post-comments-sheet/comment-item';
import {CommentProps, PostContentProps} from '../../interface/work';
import {ReplyType} from '../components/post-comments-sheet/type';

interface IProps {
    row: string;
    postDetail: PostContentProps | null;
    replyMoreLoad: any;
    getReplies: (row: any) => void;
    onPressAvatar: (userId: string) => void;
    onPressReply: (type: ReplyType, comment: CommentProps, row: any) => void;
    onPressDelete: (
        type: ReplyType,
        commentId: string,
        replyId?: string,
    ) => void;
}

const PostDetailComment: React.FC<IProps> = (props: IProps) => {
    const row: any = JSON.parse(props.row);

    return (
        <View
            style={{
                paddingLeft: 20,
                paddingRight: 20,
            }}>
            <CommentItem
                commentIndex={row.index}
                postUserId={props.postDetail?.user_id || ''}
                mainCommentUserId={row.item.user_id}
                moreLoading={
                    row.index === props.replyMoreLoad.rowIndex &&
                    props.replyMoreLoad.loading
                }
                getMoreReplies={() => props.getReplies(row)}
                commentDetail={row.item}
                showSeparator={true}
                onPressAvatar={() => props.onPressAvatar(row.item.user_id)}
                onPressReply={(type, comment) => {
                    props.onPressReply(type, comment, row);
                }}
                onPressDelete={(type, commentId, replyId) => {
                    props.onPressDelete(type, commentId, replyId);
                }}
            />
        </View>
    );
};

export default React.memo(PostDetailComment);
