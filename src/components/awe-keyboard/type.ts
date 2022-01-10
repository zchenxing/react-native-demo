export interface AweKeyboardProps {
    visible: boolean
    loading?: boolean
    replyUser?: { replyNickname: string } | null
    contentText: string,
    onChangeText: (content: string) => void
    onClose: () => void
    onPressSend: (comment: string) => void
}
