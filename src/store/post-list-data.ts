import {action, observable} from 'mobx';
import {PostContentProps} from '../interface/work';
import server from '../network';
import apis from '../network/apis';
import apiConfig from '../network/config';
import {PostUserEventType} from '../enum';
import WorkHelp from '../help/work';

export class PostListDataStore {
    @observable postStoreData: PostContentProps[] = [];

    @observable moreLoad: any = {
        moreLoading: false,
        hasMoreData: true,
    };

    @action.bound setPostStoreData = (dataSource: PostContentProps[]) => {
        this.postStoreData = [...dataSource];
    };

    private getDataSource = async (id?: string) => {
        try {
            const res = await server.get(
                apis.post.list(id),
                apiConfig.pageToken(),
            );
            return Promise.resolve(res.data);
        } catch (err) {
            return Promise.reject(err);
        }
    };

    /**
     * 加载数据
     */
    public getPostData = async () => {
        try {
            const data = await this.getDataSource();

            this.setPostStoreData(data);

            return Promise.resolve(data);
        } catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    };

    /**
     * 获取更多帖子数据
     */
    public getMorePostData = async () => {
        try {
            const _id = this.postStoreData[this.postStoreData.length - 1].id;
            const data = await this.getDataSource(_id);
            this.setPostStoreData([...this.postStoreData, ...data]);

            return Promise.resolve(data);
        } catch (err) {
            return Promise.reject(err);
        }
    };

    /**
     * 收藏帖子
     */
    public onCollectPost = async (postId: string, rowIndex: number) => {
        try {
            await server.post(apis.post.collect(postId), {});

            const userEvents: any[] =
                this.postStoreData[rowIndex].user_events || [];

            const index: number = WorkHelp.userEventExist(
                userEvents,
                PostUserEventType.Collection,
            ).existIndex;

            // 如果已经收藏，就取消，否则就添加
            if (index > -1) {
                userEvents.splice(index, 1);
            } else {
                userEvents.push({
                    event_type: PostUserEventType.Collection,
                });
            }

            this.postStoreData[rowIndex].user_events = userEvents;
            this.setPostStoreData(this.postStoreData);

            return Promise.resolve();
        } catch (err) {
            return Promise.reject();
        }
    };

    // /**
    //  * 关注用户
    //  * @param userId
    //  * @param rowIndex
    //  */
    // public onFollowUser = async (userId: string, rowIndex: number) => {
    //     try {
    //         await server.post(apis.user.follow(userId));
    //
    //         const userEvents: any[] =
    //             this.postStoreData[rowIndex].user_events || [];
    //
    //         const index: number = WorkHelp.userEventExist(
    //             userEvents,
    //             PostUserEventType.Follow,
    //         ).existIndex;
    //
    //         if (index === -1) {
    //             userEvents.push({ event_type: PostUserEventType.Follow });
    //         } else {
    //             userEvents.splice(index, 1);
    //         }
    //
    //         this.postStoreData[rowIndex].user_events = userEvents
    //
    //         this.setPostStoreData(this.postStoreData);
    //
    //         return Promise.resolve();
    //     } catch (err) {
    //         return Promise.reject();
    //     }
    // };
    //
}
