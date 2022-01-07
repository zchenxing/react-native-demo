
export interface PictureSourceProps {
    origin: string
    thumbnail: string
}

export interface AwePicturePreviewProps {
    visible: boolean

    startIndex?: number

    /** 透明度 */
    transparent?: boolean

    imageUrls: string[]

    source?: PictureSourceProps[]

    onClick: () => void
}
