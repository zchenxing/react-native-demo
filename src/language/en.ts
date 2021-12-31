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
    bio: 'Bio',
    describe_yourself: 'Describe yourself',
    personal_info: 'Personal information',
    nickname: 'Nickname',
    loading: 'Loading',
    check_connection: 'Please check your connection',
    no_result_found: 'No related results were found',
    nothing_here: 'Nothing here',


    age: 'Age',
    gender: 'Gender',
    weight: 'Weight',
    latest_location: 'Latest location',
    show_less: 'Show less',
    show_more: 'Show more',

    installation_info: 'Installation information',
    installation: 'Installation',
    release_position: 'Release position',
    coordinate: 'Coordinate',
    latitude: 'Latitude',
    longitude: 'Longitude',
    release_date: 'Release date',
    banding_number: 'Banding',
    detail_info: 'Detail information',
    head_length: 'Head length', // '头长',
    wing_length: 'Wing length', // '翅长',
    beak_length: 'Beak length', //'喙长',
    body_length: 'Body length', //'体长',
    tarsus_length: 'Tarsus length', // '跗跖',
    tail_length: 'Tail length', // '尾长',
    wingspan: 'Wingspan', // '翼展',
    additional_info: 'Additional information', // '补充信息',
    shoulder_height: 'Shoulder Height', // 肩高

    adult: 'Adult',
    child: 'Juvenile',
    uploading: 'Uploading',
    complete: 'Complete',
    share: 'Share',
    post: 'Post',
    following: 'Following',
    followers: 'Followers',
    no_following: '没有关注别人',
    no_follower: '没有被人关注',
    expiry_in: 'Expiry in ',

    x_minute_ago: (min: number, isAge: boolean) => {
        return `${min} ${min > 1 ? 'minutes' : 'minute'} ${isAge ? 'age' : ''}`
    },
    x_hour_ago: (hour: number, isAge: boolean) => {
        return `${hour} ${hour > 1 ? 'hours' : 'hour'} ${isAge ? 'age' : ''}`
    },
    x_day_ago: (day: number, isAge: boolean) => {
        return `${day} ${day > 1 ? 'days' : 'day'} ${isAge ? 'age' : ''}`
    },
};
