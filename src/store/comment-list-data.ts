import { action, observable } from "mobx";
import server from "../network";
import { CommentProps } from "../interface/work";
import apis from "../network/apis";
import apiConfig from "../network/config";
import { PAGE_SIZE } from "../config/contant";
import Utils from "../help";
import { ReplyType } from "../screen/components/post-comments-sheet/type";
import WorkHelp from "../help/work";

type CurrentReplyProps = {
    mainCommentIndex: number;
    replyNickname: string;
    // 评论id
    commentId: string;
    // 回复id
    replyId?: string;
};

export class CommentDataStore {
    // 帖子id
    private currentPostId: string = '';
    // 记录评论最后一条数据的id
    private latestCommentId: string = '';
    // 记录回复翻页
    private repliesPage: {[id: string]: number} = {};

    // ————————————————————————————————————————————————————————————————————————

    @observable contentText: string = '';
    // 评论列表数据
    @observable commentStoreData: {[id: string]: CommentProps[]} = {};
    // 回复消息的实体内容
    @observable currentReplyData: CurrentReplyProps | null = null;

    @observable commentMoreLoad: any = {
        moreLoading: true,
        hasMoreData: false,
    };

    @observable replyMoreLoad: {rowIndex: number; loading: boolean} = {
        rowIndex: -1,
        loading: false,
    };

    /**
     * 重置数据
     */
    @action.bound resetCommentData = (listId?: string) => {
        this.commentMoreLoad = {
            moreLoading: false,
            hasMoreData: false,
        };
        this.repliesPage = {};
        this.currentPostId = '';
        this.latestCommentId = '';
        this.currentReplyData = null;
        if (listId) {
            this.commentStoreData[listId] = [];
        }
    };

    @action.bound setCommentStoreData = (
        listId: string,
        dataSource: CommentProps[],
    ) => {
        this.commentStoreData = {
            ...this.commentStoreData,
            [listId]: [...dataSource],
        };
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
     * @param listId
     * @param loadMore 是否加载更多数据
     */
    public getCommentData = async (
        postId: string,
        listId: string,
        loadMore?: boolean,
    ) => {
        this.currentPostId = postId;

        if (loadMore) {
            this.commentMoreLoad.moreLoading = true;
        }

        try {
            const res = await server.get(
                apis.post.comment.list(postId, this.latestCommentId),
                apiConfig.pageToken(),
            );

            this.commentMoreLoad.moreLoading = false;

            if (res.data.length) {
                this.latestCommentId = res.data[res.data.length - 1].id;

                const result = [
                    ...(this.commentStoreData[listId] || []),
                    ...res.data,
                ];
                this.setCommentStoreData(listId, result);

                // 数据小于 page size，表示也m没有更多数据
                this.commentMoreLoad.hasMoreData = !(
                    res.data.length < PAGE_SIZE
                );
            } else {
                this.commentMoreLoad.hasMoreData = false;
            }

            return Promise.resolve(res);
        } catch (err) {
            return Promise.reject(err);
        }
    };

    /**
     * 发送消息给主题
     */
    public sendCommentToPost = async (listId: string) => {
        try {
            const res = await server.post(
                apis.post.comment.push(this.currentPostId),
                {content: Utils.removeSpaceAndEnter(this.contentText)},
            );

            this.setContentText('');
            this.setCommentStoreData(listId, [
                res.data,
                ...(this.commentStoreData[listId] || []),
            ]);

            return Promise.resolve(res);
        } catch (err) {
            return Promise.reject(err);
        }
    };

    /**
     * 回复评论
     */
    public sendReplyToComment = async (listId: string) => {
        try {
            // 判断回复评论or回复
            const replyToComment: boolean = !this.currentReplyData?.replyId;

            // 回复评论
            const api = replyToComment
                ? apis.comment.replyToComment(
                      this.currentReplyData?.commentId || '',
                  )
                : apis.comment.replyToReply(
                      this.currentReplyData?.commentId,
                      this.currentReplyData?.replyId,
                  );

            const res = await server.post(api, {
                content: Utils.removeSpaceAndEnter(this.contentText),
            });


            // 向评论中插入回复
            const commentIndex = this.currentReplyData?.mainCommentIndex || 0;
            if (commentIndex > -1) {
                const data = this.commentStoreData[listId][commentIndex];

                const replies = data.replies;
                if (replies) {
                    // 回复总数要+1
                    data.total_reply += 1;
                    data.replies = [...replies, res.data];
                } else {
                    data.replies = [res.data];
                }

                this.commentStoreData[listId][commentIndex] = data;
            }

            this.setCommentStoreData(listId, this.commentStoreData[listId]);
            this.setContentText('');

            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    };

    /**
     * 获取更多回复
     */
    public getMoreReplies = async (
        rowIndex: number,
        comment: CommentProps,
        listId: string,
    ) => {
        // 如果评论的回复page不存在，那么将回复页数置为1
        !this.repliesPage[comment.id] && (this.repliesPage[comment.id] = 1);

        try {
            this.replyMoreLoad = {
                rowIndex,
                loading: true,
            };

            const res = await server.get(
                apis.comment.replyList(
                    comment.id,
                    this.repliesPage[comment.id],
                ),
                apiConfig.pageToken(),
            );

            // page自增，用于下次向下翻页
            if (res.data.length) {
                this.repliesPage[comment.id] += 1;
            }

            const replies: CommentProps[] =
                this.commentStoreData[listId][rowIndex].replies || [];

            // 将回复数据去重
            this.commentStoreData[listId][rowIndex].replies =
                Utils.arrayObjectDeDuplication('id', [...replies, ...res.data]);

            this.replyMoreLoad = {
                rowIndex,
                loading: false,
            };

            this.setCommentStoreData(listId, this.commentStoreData[listId]);

            return Promise.resolve();
        } catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    };


    /**
     * 删除评论或回复
     * @param listId
     * @param type
     * @param commentId
     * @param replyId
     */
    public onDeleteCommentReply = async (
        listId: string,
        type: ReplyType,
        commentId: string,
        replyId?: string,
    ) => {
        try {

            // 删除评论
            let api = type === ReplyType.Comment ?
                apis.comment.deleteComment(commentId) :
                apis.comment.deleteReply(commentId, replyId || '')

            const commentData: CommentProps[] = this.commentStoreData[listId]
            const commentIndex = WorkHelp.getDataSourceIndex(
                commentData,
                commentId,
            );

            if (commentIndex > -1) {
                if (type === ReplyType.Comment) {

                    await server.delete(api)
                    commentData.splice(commentIndex, 1)

                    this.commentStoreData[listId] = commentData
                }
                else if (type === ReplyType.Reply && replyId) {
                    const replyData: CommentProps[] = this.commentStoreData[listId][commentIndex].replies || []
                    const replyIndex = WorkHelp.getDataSourceIndex(
                        replyData,
                        replyId,
                    );

                    await server.delete(api)

                    replyData.splice(replyIndex, 1)
                    this.commentStoreData[listId][commentIndex].replies = replyData
                }

            }
            this.setCommentStoreData(
                listId,
                this.commentStoreData[listId],
            );
            return Promise.resolve()

        } catch (err) {
            console.log('Delete comment error:', err);
            return Promise.reject(err)
        }
    }

}
