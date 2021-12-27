import { PostContentProps } from "../../../interface/work";

export interface PostListProps {
    api: any
    apiParam?: string
    listId: string
    onPressDetail: (postContent: PostContentProps, rowIndex: number) => void
    onPressPersonal: (userId: string) => void
}
