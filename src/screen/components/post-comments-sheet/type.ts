import { CommentProps } from "../../../interface/work";

export interface PostCommentProps {
    rowIndex: number
    // postId: string
    visible: boolean
    // totalComment: number
    onClose: () => void
    onPressAvatar: () => void
}

export interface PostCommentsItemProps {
    commentDetail: CommentProps
    // 更多回复
    subComment?: any[]
    // 是否显示分隔符
    showSeparator?: boolean
    // 点击回复某人
    onPressReply: () => void
    // 点击头像跳转
    onPressAvatar: () => void
}
