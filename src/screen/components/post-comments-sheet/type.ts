export interface PostCommentProps {
    cRef: any
    visible: boolean
    sheetId: string
    onClose: () => void
    onPressAvatar: () => void
}


export interface PostCommentsItemProps {
    // 更多回复
    subComment?: any[]
    // 是否显示分隔符
    showSeparator?: boolean
    // 点击回复某人
    onPressReply: () => void
    // 点击头像跳转
    onPressAvatar: () => void
}
