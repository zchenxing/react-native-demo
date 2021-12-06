import dayjs from 'dayjs'
import { useLanguage } from "../language";

const Utils = {

    /**
     * 显示发布时间，发布时间与当前时间的时间差
     * 0 < time <120s       显示 刚刚
     * 120s <= time < 60min 显示 2～59分钟前
     * 1h <= time < 24h      显示 n小时前
     * 24h <= time < 48h    显示 昨天
     * 48h <= time < 168h   发布当天到现在间隔n天, 显示 n+1天前
     * 是否为今年             显示 MM-DD
     * 其余                  显示 YYYY-MM-DD
     */
    getPostTime: (time: string) => {

        const seconds = dayjs().diff(time, 'seconds')

        const postYear = dayjs(time).format('YYYY')
        const thisYear = dayjs().format('YYYY')



        // 0 < time <120s       显示 刚刚
        if (seconds > 0 && seconds < 120) {
            return useLanguage.just_now
        }
        // 120s <= time < 60min 显示 2～59分钟前
        else if (seconds > 119 && seconds < 3600) {
            const minutes = Math.floor(seconds / 60)
            return useLanguage.x_minute_ago(minutes)
        }
        // 1h <= time < 24h   显示n小时前
        else if (seconds >= 3600 && seconds < 3600 * 24) {

            const hours = Math.floor(seconds / 3600)
            return useLanguage.x_hour_ago(hours)
        }
        // 24h <= time < 48h    显示 昨天
        else if (seconds >= 3600 * 24 && seconds < 3600 * 48) {
            return useLanguage.yesterday
        }
        // 48h <= time < 168h   发布当天到现在间隔n天, 显示 n+1天前
        else if (seconds >= 3600 * 48 && seconds < 3600 * 168) {
            const days = dayjs().diff(time, 'days')
            return useLanguage.x_day_ago(days)
        }
        // 是否为今年             显示 MM-DD
        else if (postYear === thisYear) {
            return dayjs(time).format('MM-DD')
        }
        else {
            return dayjs(time).format('YYYY-MM-DD')
        }

        return seconds
    }

}



export default Utils
