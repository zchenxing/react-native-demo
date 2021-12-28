
export enum NetworkStatus {
    // 未知类型
    Unknown,
    // 有网
    Working,
    // 没有网
    None,
}

export enum TagsType {
    None,
    TagBird,
}


export enum GenderProps {
    Woman = 1,
    Man,
    Unknown
}


export enum EditInfoType {
    Nickname,
    Intro
}


export const UserEventType = {
    // 收藏帖子
    Collection: 1,
    // 点赞
    Lick: 2 ,
    // 关注
    Follow: 3
}



// 帖子类型
export const PostType = {
    // 正常图文帖子
    Normal: 'Normal',
    // 生物卡片
    BiologicalCard: 'BiologicalCard',
    // 委托
    Entrust: 'Entrust',
}
