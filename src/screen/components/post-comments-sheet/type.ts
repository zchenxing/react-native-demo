import { CommentProps } from "../../../interface/work";

export enum ReplyType {
    // 评论
    Comment,
    // 回复
    Reply
}

export interface PostCommentProps {
    listId: string
    rowIndex: number
    // postId: string
    visible: boolean
    // totalComment: number
    onClose: () => void
    onPressAvatar: (userId: string) => void
}

export interface PostCommentsItemProps {
    mySelfId?: string
    // 评论下标
    commentIndex?: number
    // 加载更多评论的loading
    moreLoading?: boolean
    // 获取更多评论
    getMoreReplies?: () => void
    // 评论id
    mainCommentUserId: string
    // 判断是作者
    isAuthor: boolean
    // 当前登录用户的id
    commentDetail: CommentProps
    // 更多回复
    subComment?: any[]
    // 是否显示分隔符
    showSeparator?: boolean
    // 点击回复某人
    onPressReply: (replyType: ReplyType, commentData: CommentProps) => void
    // 点击删除评论 / 回复
    onPressDelete: (
        replyType: ReplyType,
        commentId: string,
        replyId?: string,
    ) => void;
    // 点击头像跳转
    onPressAvatar: () => void
}
