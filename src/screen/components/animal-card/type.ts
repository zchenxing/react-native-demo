
export interface AnimalCardProps {
    // 物种类型：shareSpeciesTags
    speciesType?: string
    animalType: AnimalCardType
    // 展示最近定位，列表用
    showLocation?: boolean
    // 显示更多信息，详情用
    showOtherInfo?: boolean
    // 分享的信息
    shareData?: ShareProps | null
    // 分享数据
    animalInfo?: ShareAnimalProps | null

}


export enum AnimalCardType {
    ShareType,
    QuestType
}


// 分享类型
export enum ShareDataCategoryType {
    // 定位信息
    Location,
    // 2d轨迹
    Track2D = 10,
    // 3d轨迹
    Track3D = 11,
}


export type ShareProps = {
    stoped: boolean
    animal_category: string
    biological_name: string
    data_category: ShareDataCategoryType
}

export enum AnimalAge {
    Adult,
    Child
}

export type ShareAnimalProps = {
    biological_base: {
        age: AnimalAge
        name: string
        species: string
        gender: AnimalAge
        weight: number
    },
    biological_release?: {
        timestamp?: string
        location?: string
        longitude?: number
        latitude?: number
    },
    biological_detail?: {
        // 头长
        head_length?: number
        // 翅长
        wing_length?: number
        // 喙长
        culmen_length?: number
        //  跗跖长
        tarsus_length?: number
        // 尾长
        tail_length?: number
        // 翼展
        wingspan?: number
        // 体长
        body_length?: number
        // 哺乳类特定
        shoulder_height?: number
    },
    images: string[]
    imageUrls: string[]
}
