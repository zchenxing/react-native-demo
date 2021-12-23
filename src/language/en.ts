export const languageEn = {

    animal_special: 'Special',
    author: 'Author',
    choose_category: 'Choose a category',
    choose_category_first: 'Choose a category first',
    clear: 'Clear',
    comment: 'Comment',
    create_post: 'Create Post',
    dont_save: "Don't save",
    history: 'History',
    just_now: 'Now',
    load_more: 'Load more',
    no_more_data: 'No more data',
    reply_to: 'Reply to ',
    save: 'Save',
    save_post_to_draft: 'Do you want to save as a draft ?',
    say_something: 'Say something',
    view_more_replies: 'View more replies',
    yesterday: 'yesterday',

    x_minute_ago: (min: number) =>
        `${min} ${min > 1 ? 'minutes' : 'minute'} ago`,
    x_hour_ago: (hour: number) => `${hour} ${hour > 1 ? 'hours' : 'hour'} ago`,
    x_day_ago: (day: number) => `${day} ${day > 1 ? 'days' : 'day'} ago`,
};
