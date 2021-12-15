export interface PostCommentsProps {
    visible: boolean
    onClose: () => void
}


export interface PostCommentsItemProps {
    // 更多回复
    subComment?: any[]
    // 是否显示分隔符
    showSeparator?: boolean
    // 点击回复某人
    onPressReply?: () => void
}
