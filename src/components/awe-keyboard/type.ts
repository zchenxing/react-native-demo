export interface AweKeyboardProps {
    visible: boolean
    contentText: string,
    onChangeText: (content: string) => void
    onClose: () => void
}
