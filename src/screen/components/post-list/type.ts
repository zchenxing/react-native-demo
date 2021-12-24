import { PostContentProps } from "../../../interface/work";

export interface PostListProps {
    onPressDetail: (postContent: PostContentProps, rowIndex: number) => void
    onPressPersonal: () => void
}
