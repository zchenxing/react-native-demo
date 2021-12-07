export const languageEn = {

    clear: 'Clear',
    just_now: '刚刚',
    yesterday: '昨天',
    comment: 'Comment',
    history: 'History',
    say_something: 'Say something',

    x_minute_ago: (min: number) => `${min} ${min > 1 ? 'minutes' : 'minute'} ago`,
    x_hour_ago: (hour: number) => `${hour} ${hour > 1 ? 'hours' : 'hour'} ago`,
    x_day_ago: (day: number) => `${day} ${day > 1 ? 'days' : 'day'} ago`,
}
