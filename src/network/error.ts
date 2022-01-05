import Toast from 'react-native-simple-toast';

export const errorMessage = {
    errorCode: {
        // 参数错误
        10001: '参数错误',
        // 用户名无效
        30001: '用户名无效',
        // 密码错误
        30002: '密码错误',
        // 主题已被删除
        40001: '主题已被删除',
        // 评论已被删除
        40002: '评论已被删除',
    },

    alert: (err: any) => {
        const code = err.response ? (err.response.data.code ? err.response.data.code : '') : 0

        let errorStr = '请求错误，请重试'

        if (code === 500) {
            // 服务器异常
            errorStr = '服务器异常'
        }
        else {
            try {
                // @ts-ignore
                errorStr = errorMessage.errorCode[code]
            } catch (err) {
                errorStr = '请求错误，请重试'
            }
        }

        Toast.showWithGravity(errorStr, 1, Toast.CENTER)
    },
}
