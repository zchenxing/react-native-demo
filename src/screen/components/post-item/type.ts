export interface PostItemProps {
    // 隐藏关注按钮
    hiddenFollow?: boolean
    // 点击查看帖子详情
    onPressDetail: () => void
    // 查看图片
    onPressPicture: (pictureList: any[], startIndex: number) => void
    // 查看评论
    onPressComment: () => void
    // 查看用户
    onPressPersonal: () => void
    [props: string]: any
}
