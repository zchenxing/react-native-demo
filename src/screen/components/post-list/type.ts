
interface PostListProps {
    dataSource: any[]
    refreshing: boolean
    moreLoading: boolean
    onPressDetail: () => void
    onRefreshData: () => void
    onLoadMoreData: () => void
    onPressPersonal: () => void
}
