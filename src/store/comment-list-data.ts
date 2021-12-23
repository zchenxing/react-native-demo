import {action, observable} from 'mobx';
import server from '../network';
import {CommentProps} from '../interface/work';
import apis from '../network/apis';
import apiConfig from "../network/config";

type CurrentReplyProps = {
    replyNickname: string;
    // 评论id
    commentId: string;
    // 回复id
    replyId?: string;
};

export class CommentDataStore {
    // 帖子id
    private currentPostId: string = '';

    // ————————————————————————————————————————————————————————————————————————

    @observable contentText: string = '';
    // 评论列表数据
    @observable commentStoreData: CommentProps[] = [];
    // 回复消息的实体内容
    @observable currentReplyData: CurrentReplyProps | null = null;

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

    public getCommentData = async (postId: string) => {
        this.currentPostId = postId;

        try {
            const res = await server.get(
                apis.post.comment.list(postId),
                apiConfig.pageToken(),
            );
            this.setCommentStoreData(res.data);

        } catch (err) {}
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

            await server.post(api, {content: this.contentText});
            this.setContentText('');

            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    };

    /**
     * 回复回复
     */
    public sendReplyToReply = async (content: string) => {};
}
