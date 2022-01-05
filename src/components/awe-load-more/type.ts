export interface AweLoadMoreProps {
    loading: boolean
    title?: string
    hasMoreData: boolean
    handleNoMoreData: () => void
}
