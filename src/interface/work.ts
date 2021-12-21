import { UserEventType } from "../enum";


export interface UserEventProps {
    id: string
    user_id: string
    event_type: UserEventType
    event_object_id: string
    note: string
}

export interface AnimalCardProps {
    nickname: string
    species: string // 物种
    age: string // 出生日期
    weight: number
    note: string
    share_url: string
}


// 帖子接口
export interface PostContentProps {
    id: string
    created_at: string
    user_id: string
    // 主题标签
    label: string
    // 主题内容
    content: string
    // 评论数
    total_comment: number
    // 点赞数
    total_like: number
    // 用户信息
    user_info: {
        id: string
        nickname: string
        avatar: string
    },
    biological_card?: AnimalCardProps
    // 用户事件
    user_events?: UserEventProps[] | null
}
