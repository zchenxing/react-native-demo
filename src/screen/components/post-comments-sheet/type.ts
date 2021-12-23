import { CommentProps } from "../../../interface/work";

export enum ReplyType {
    // 回复 评论
    ReplyToComment,
    // 回复 回复
    ReplyToReply
}

export interface PostCommentProps {
    rowIndex: number
    // postId: string
    visible: boolean
    // totalComment: number
    onClose: () => void
    onPressAvatar: () => void
}

export interface PostCommentsItemProps {
    // 评论下标
    commentIndex?: number
    getMoreReplies?: () => void
    // 评论id
    mainCommentUserId: string
    isAuthor: boolean
    // 当前登录用户的id
    commentDetail: CommentProps
    // 更多回复
    subComment?: any[]
    // 是否显示分隔符
    showSeparator?: boolean
    // 点击回复某人
    onPressReply: (replyType: ReplyType, commentData: CommentProps) => void
    // 点击头像跳转
    onPressAvatar: () => void
}
