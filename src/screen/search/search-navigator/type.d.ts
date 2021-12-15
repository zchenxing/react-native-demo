export interface SearchNavigatorProps {
    defaultValue?: string
    /** 禁止编辑 */
    editDisable?: boolean
    /** 自动聚焦 */
    autoFocus?: boolean
    /** 返回事件 */
    onLeftPress: () => void
    /** 键盘搜索 完成按钮事件 */
    onSearchDone?: (result: string) => void
    /** 点击禁止时的input */
    onPressDisableInput?: () => void
}
