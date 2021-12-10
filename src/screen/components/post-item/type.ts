export interface PostItemProps {
    onPressDetail: () => void
    onPressPicture: (pictureList: any[], startIndex: number) => void
    onPressComment: () => void
    onPressPersonal: () => void
    [props: string]: any
}
