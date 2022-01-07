import { PostImageProps, PostContentProps } from "../../../interface/work";

export interface PostItemProps {
    row: string
    postItem: PostContentProps
    // 隐藏关注按钮
    hiddenFollow?: boolean
    // 点击查看帖子详情
    onPressDetail: (postContent: PostContentProps, rowIndex: number) => void
    // 查看图片
    onPressPicture: (pictureList: PostImageProps[], startIndex: number) => void
    // 点击收藏
    onPressCollection: (row: any) => void
    // 查看评论
    onPressComment: (row: any) => void
    // 查看用户
    onPressPersonal?: (userId: string) => void
    // 更多操作
    onPressMoreAction?: (row: any) => void
}
