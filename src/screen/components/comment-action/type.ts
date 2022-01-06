
export interface CommentActionProps {
    visible: boolean
    onReply: () => void
    onCopy: () => void
    showDelete?: boolean
    onDelete?: () => void
    onClose: () => void
}
