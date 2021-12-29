import { GenderProps } from "../enum";

export type UserEventProps = {
    event_type: 1 | 2 | 3
}


export interface UserInfoProps {
    id: string
    created_at: string
    username: string
    nickname?: string
    total_theme?: number
    total_follow?: number
    total_fans?: number
    gender?: GenderProps
    avatar?: string
    job?: string
    address?: string
    birthday?: string
    // 简介
    intro?: string
    user_event?: UserEventProps | null
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
    user_info: UserInfoProps,
    biological_card?: AnimalCardProps
    // 用户事件，1-收藏主题，2-点赞主题，3-关注用户
    user_events?: UserEventProps[] | null
    // //
    // event_types: number[]
}


/**
 * 评论
 */
export interface CommentProps {
    // 评论和回复通用
    id: string
    created_at: string
    user_id: string
    theme_id: string
    content: string
    total_reply: number
    user_info: {
        nickname: string
        avatar: string
    },
    replies?: CommentProps[] | null
    // --- 只有回复才有的 ---
    // 回复目标用户id
    target_user_id?: string
    // 回复目标用户信息
    target_user_info?: {
        nickname: string
        avatar: string
    },
}


// /**
//  * 评论的回复
//  */
// export interface ReplyProps {
//     id: string
//     created_at: string
//     user_id: string
//     content: string
//     // 回复目标用户id
//     target_user_id: string
//     user_info: {
//         nickname: string
//         avatar: string
//     },
//     // 回复目标用户信息
//     target_user_info: {
//         nickname: string
//         avatar: string
//     },
//     total_reply?: number
// }
