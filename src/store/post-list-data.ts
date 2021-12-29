import {action, observable} from 'mobx';
import {PostContentProps} from '../interface/work';
import server from '../network';
import apis from '../network/apis';
import apiConfig from '../network/config';
import {UserEventType} from '../enum';
import WorkHelp from '../help/work';
import {INTELINK_SCREEN_NAME} from '../routes/screen-name';

type PageParam = {
    pageId?: string;
    api: any;
    apiParam: string;
};

export class PostListDataStore {
    @observable postStoreData: {[id: string]: PostContentProps[]} = {
        [INTELINK_SCREEN_NAME.SCREEN_HOME]: [],
    };

    @observable moreLoad: any = {
        moreLoading: false,
        hasMoreData: true,
    };

    @action.bound setPostStoreData = (
        listId: string,
        dataSource: PostContentProps[],
    ) => {
        this.postStoreData = {
            ...this.postStoreData,
            [listId]: [...dataSource],
        };
    };

    private getDataSource = async (param: PageParam) => {
        try {
            const res = await server.get(
                param.apiParam
                    ? param.api(param.apiParam, param.pageId)
                    : param.api(param.pageId),
                apiConfig.pageToken(),
            );
            return Promise.resolve(res);
        } catch (err) {
            return Promise.reject(err);
        }
    };

    /**
     * 加载数据
     */
    public getPostData = async (param: PageParam, listId: string) => {
        try {
            const res = await this.getDataSource({
                api: param.api,
                apiParam: param.apiParam,
            });

            this.setPostStoreData(listId, res.data);
            return Promise.resolve(res);
        } catch (err) {
            console.log('getPostData = ',err);
            return Promise.reject(err);
        }
    };

    /**
     * 获取更多帖子数据
     */
    public getMorePostData = async (param: PageParam, listId: string) => {
        try {
            const _id =
                this.postStoreData[listId][
                    this.postStoreData[listId].length - 1
                ].id;
            const res = await this.getDataSource({
                pageId: _id,
                api: param.api,
                apiParam: param.apiParam,
            });
            this.setPostStoreData(listId, [
                ...this.postStoreData[listId],
                ...res.data,
            ]);

            return Promise.resolve(res);
        } catch (err) {
            return Promise.reject(err);
        }
    };

    /**
     * 收藏帖子
     */
    public onCollectPost = async (
        postId: string,
        rowIndex: number,
        listId: string,
    ) => {
        const userEvents: any[] =
            this.postStoreData[listId][rowIndex].user_events || [];

        const index: number = WorkHelp.userEventExist(
            userEvents,
            UserEventType.Collection,
        ).existIndex;

        try {
            // 先执行收藏操作，再发起请求
            // 如果已经收藏，就取消，否则就添加
            if (index > -1) {
                userEvents.splice(index, 1);
            } else {
                userEvents.push({
                    event_type: UserEventType.Collection,
                });
            }
            this.postStoreData[listId][rowIndex].user_events = userEvents;
            this.setPostStoreData(listId, this.postStoreData[listId]);

            await server.post(apis.post.collect(postId), {});

            return Promise.resolve();
        } catch (err) {
            // 如果已经收藏，就取消，否则就添加
            if (index > -1) {
                userEvents.splice(index, 1);
            } else {
                userEvents.push({
                    event_type: UserEventType.Collection,
                });
            }
            return Promise.reject();
        }
    };
}
