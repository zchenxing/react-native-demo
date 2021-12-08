
interface PostListProps {
    dataSource: any[]
    refreshing: boolean
    moreLoading: boolean
    onRefreshData: () => void
    onLoadMoreData: () => void
}
