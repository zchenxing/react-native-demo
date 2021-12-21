import { PostContentProps } from "../../../interface/work";

export interface PostListProps {
    onPressDetail: (postContent: PostContentProps) => void
    onPressPersonal: () => void
}
