export interface AweKeyboardProps {
    visible: boolean
    contentText: string,
    onChangeText: (content: string) => void
    onClose: () => void
    onPressSend: (comment: string) => void
}
