import React from 'react';
import CommentItem from './comment-item';

const Comments: React.FC<any> = React.memo((props: any) => {
    const row = JSON.parse(props.row);
    const userId = props.postStoreData[props.listId][props.rowIndex].user_id;
    // console.log('render comments', props.row);
    return (
        <CommentItem
            commentIndex={row.index}
            commentDetail={row.item}
            mainCommentUserId={row.item.user_id}
            moreLoading={
                row.index === props.replyMoreLoad.rowIndex &&
                props.replyMoreLoad.loading
            }
            postUserId={userId}
            showSeparator={true}
            getMoreReplies={() => props.getReplies(row)}
            onPressAvatar={() => props.onPressAvatar(row.item.user_id)}
            onPressReply={(type, comment) => {
                props.onPressReply(type, comment, row);
            }}
            onPressDelete={props.onPressDelete}
        />
    );
});

export default Comments;
