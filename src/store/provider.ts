import {createContext, useContext} from 'react';
import { COMMENT_LIST_DATA, POST_LIST_DATA, PUBLISH_DATA, SELF_INFO_DATA } from "./constant";
import { PostListDataStore } from "./post-list-data";
import { SelfInfoDataStore } from "./self-info-data";
import { CommentDataStore } from "./comment-list-data";
import { PublishDataStore } from "./publish-data";

function createStores() {
    return {
        [POST_LIST_DATA]: new PostListDataStore(),
        [SELF_INFO_DATA]: new SelfInfoDataStore(),
        [COMMENT_LIST_DATA]: new CommentDataStore(),
        [PUBLISH_DATA]: new PublishDataStore()
    };
}

const stores = createStores();
const StoresContext = createContext(stores);
const useStores = () => useContext(StoresContext);


function usePostListDataStore() {
    const {post_list_data} = useStores()
    return post_list_data
}


function useSelfDataStore() {
    const {self_info_data} = useStores()
    return self_info_data
}

function useCommentDataStore() {
    const {comment_list_data} = useStores()
    return comment_list_data
}


function usePublishDataStore() {
    const {publish_data} = useStores()
    return publish_data
}


// const selfDataStore = stores[SELF_INFO_DATA];
// const postListDataStore = stores[POST_LIST_DATA];
// const commentDataStore = stores[COMMENT_LIST_DATA]

export {
    stores,
    StoresContext,
    useStores,

    // postListDataStore,
    // selfDataStore,
    // commentDataStore,

    usePostListDataStore,
    useSelfDataStore,
    useCommentDataStore,
    usePublishDataStore


};
