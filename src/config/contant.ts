import { Platform, Dimensions } from "react-native";

export const isIOS = Platform.OS === 'ios'

export const screenWidth = Dimensions.get('window').width

export const screenHeight = Dimensions.get('window').height

export const PAGE_SIZE = 20


/**
 * 统一配置事件监听名
 */
export const EventEmitterName = {
    // 刷新首页列表
    RefreshHome: 'RefreshHome',
    // 发布 -> 选择类别
    ChooseCategory: 'ChooseCategory',
    // 编辑信息后刷新数据
    EditInfo: 'EditInfo'
}

