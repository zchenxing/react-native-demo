export interface AwePicturePreviewProps {
    visible: boolean

    startIndex?: number

    /** 透明度 */
    transparent?: boolean

    imageUrls?: { url: string, props?: any }[]

    onClick: () => void
}
