
export interface CommentActionProps {
    visible: boolean
    onReply: () => void
    showDelete?: boolean
    onDelete?: () => void
    onClose: () => void
}
