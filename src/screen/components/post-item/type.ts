export interface PostItemProps {
    onPressDetail: () => void
    onPressPicture: (pictureList: any[], startIndex: number) => void
    onPressComment: () => void
    [props: string]: any
}
