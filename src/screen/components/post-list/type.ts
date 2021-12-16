
interface PostListProps {
    cRef: any
    sheetId: string
    dataSource: any[]
    refreshing: boolean
    moreLoading: boolean
    onPressDetail: () => void
    onRefreshData: () => void
    onLoadMoreData: () => void
    onPressPersonal: () => void
}
