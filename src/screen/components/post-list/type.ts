
interface PostListProps {
    api: string
    dataSource: any[]
    refreshing: boolean
    moreLoading: boolean
    onPressDetail: () => void
    onRefreshData: () => void
    onLoadMoreData: () => void
    onPressPersonal: () => void
}
