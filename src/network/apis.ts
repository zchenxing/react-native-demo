
const apis = {
    user: {
        register: '/v1/register',
        login: '/v1/login',
        // 个人用户信息，get | put
        myself: '/v1/user/',
        // 查看用户信息
        other: (userId: string) => `/v1/user/id/${userId}`,
        // 关注
        follow: (userId: string) => `/v1/user/id/${userId}/follow/`,
        // 已发布帖子列表
        posts: (userId: string, param = '') => {
            return `/v1/user/id/${userId}/theme/page/${param}`
        }
    },
    // 帖子API
    post: {
        // 新建帖子
        create: '/v1/theme/',
        // 帖子 查看 | 删除
        one: (postId: string) => `/v1/theme/id/${postId}`,
        // 发帖列表
        list: (param = '') => `/v1/theme/page/${param}`,
        // 搜索帖子
        search: (name: string, param = '') => {
            return `/v1/theme/search/${name}/page/${param}`
        },
        // 收藏操作
        collect: (postId: string) => `/v1/theme/id/${postId}/collect`,
        comment: {
            // 评论列表
            list: (postId: string, param = '') => {
                return `/v1/theme/id/${postId}/comment/page/${param}`
            },
            // 发表评论
            push: (postId: string) => `/v1/theme/id/${postId}/comment`,
        }
    },
    // 评论API
    comment: {
        // 回复评论
        replyToComment: (comId: string) => `/v1/comment/id/${comId}/reply`,
        // 回复评论下面的回复
        replyToReply: (comId: string | undefined, repId: string | undefined) => {
            return `/v1/comment/id/${comId}/reply/id/${repId}`
        },
        // 回复列表
        replyList: (comId: string, param = '') => {
            return `/v1/comment/id/${comId}/reply/page/${param}`
        },
        // 删除评论
        deleteComment: (comId: string) => `/v1/comment/id/${comId}`,
        // 删除回复
        deleteReply: (comId: string, repId: string) => {
            return `/v1/comment/id/${comId}/reply/id/${repId}`
        }
    },
    // 文件API
    file: {
        // 上传文件
        upload: '/v1/file/',
        // 删除文件
        delete: (fileId: string) => `/v1/file/id/${fileId}`,
        // 文件列表
        list: (param = '') => `/v1/file/page/${param}`
    }
}

export default apis
