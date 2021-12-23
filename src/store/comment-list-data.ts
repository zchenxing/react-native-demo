import {action, observable} from 'mobx';
import server from '../network';
import {CommentProps} from '../interface/work';
import apis from '../network/apis';
import apiConfig from "../network/config";
import { PAGE_SIZE } from "../config/contant";

type CurrentReplyProps = {
    mainCommentIndex: number
    replyNickname: string;
    // 评论id
    commentId: string;
    // 回复id
    replyId?: string;
};

export class CommentDataStore {
    // 帖子id
    private currentPostId: string = '';
    private latestCommentId: string = ''

    // ————————————————————————————————————————————————————————————————————————

    @observable contentText: string = '';
    // 评论列表数据
    @observable commentStoreData: CommentProps[] = [];
    // 回复消息的实体内容
    @observable currentReplyData: CurrentReplyProps | null = null;

    @observable moreLoad: any = {
        moreLoading: false,
        hasMoreData: true
    }

    /**
     * 重置数据
     */
    @action.bound resetData = () => {
        this.moreLoad = {
            moreLoading: false,
            hasMoreData: true
        }
        this.currentPostId = ''
        this.latestCommentId = ''
        this.commentStoreData = []
    }

    @action.bound setCommentStoreData = (dataSource: CommentProps[]) => {
        this.commentStoreData = [...dataSource];
    };

    @action.bound setContentText = (text: string) => {
        this.contentText = text;
    };

    @action.bound setCurrentReplyData = (data: CurrentReplyProps | null) => {
        this.currentReplyData = data;
    };

    // ————————————————————————————————————————————————————————————————————————

    /**
     *
     * @param postId
     * @param loadMore 是否加载更多数据
     */
    public getCommentData = async (postId: string, loadMore?: boolean) => {
        this.currentPostId = postId;

        if (loadMore) {
            this.moreLoad.moreLoading = true
        }

        try {
            const res = await server.get(
                apis.post.comment.list(postId, this.latestCommentId),
                apiConfig.pageToken(),
            );

            this.moreLoad.moreLoading = false

            if (res.data.length) {
                this.latestCommentId = res.data[res.data.length - 1].id

                const result = [...this.commentStoreData, ...res.data]
                this.setCommentStoreData(result);

                // 数据小于 page size，表示也m没有更多数据
                this.moreLoad.hasMoreData = res.data.length >= PAGE_SIZE;

            } else {
                this.moreLoad.hasMoreData = false
            }

            return Promise.resolve(res)

        } catch (err) {
            return Promise.reject(err)
        }
    };

    /**
     * 发送消息给主题
     */
    public sendCommentToPost = async () => {
        try {
            const res = await server.post(
                apis.post.comment.push(this.currentPostId),
                {content: this.contentText},
            );

            this.setContentText('');
            this.setCommentStoreData([res.data, ...this.commentStoreData]);

            return Promise.resolve(res);

        } catch (err) {
            return Promise.reject(err);
        }
    };

    /**
     * 回复评论
     */
    public sendReplyToComment = async () => {
        try {
            // 回复评论
            let api = apis.comment.replyToComment(
                this.currentReplyData?.commentId)

            // 回复回复
            if (this.currentReplyData?.replyId) {
                api = apis.comment.replyToReply(
                    this.currentReplyData.commentId,
                    this.currentReplyData.replyId,
                );
            }

            const res = await server.post(api, {content: this.contentText});

            // 向评论中插入回复数据
            const commentIndex = this.currentReplyData?.mainCommentIndex || 0

            if (commentIndex > -1) {
                const replies = this.commentStoreData[commentIndex].replies
                if (replies) {
                    this.commentStoreData[commentIndex].replies = [
                        ...replies,
                        res.data,
                    ];
                } else {
                    this.commentStoreData[commentIndex].replies = [res.data]
                }

                this.setCommentStoreData(this.commentStoreData)
            }



            console.log('回复消息', res.data);

            this.setContentText('');

            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    };

}
