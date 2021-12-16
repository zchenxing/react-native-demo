export const languageEn = {

    clear: 'Clear',
    just_now: '刚刚',
    yesterday: '昨天',
    comment: 'Comment',
    history: 'History',
    say_something: 'Say something',
    no_more_data: 'No more data',
    load_more: 'Load more',
    animal_special: 'Special',
    save_post_to_draft: 'Do you want to save as a draft ?',
    dont_save: "Don't save",
    save: 'Save',

    x_minute_ago: (min: number) => `${min} ${min > 1 ? 'minutes' : 'minute'} ago`,
    x_hour_ago: (hour: number) => `${hour} ${hour > 1 ? 'hours' : 'hour'} ago`,
    x_day_ago: (day: number) => `${day} ${day > 1 ? 'days' : 'day'} ago`,
}
