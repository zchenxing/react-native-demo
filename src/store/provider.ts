import {createContext, useContext} from 'react';
import { POST_LIST_DATA, SMART_DATA } from "./constant";
import {SmartDataStore} from './smart-data';
import { PostListDataStore } from "./post-list-data";

function createStores() {
    return {
        [SMART_DATA]: new SmartDataStore(),
        [POST_LIST_DATA]: new PostListDataStore()
    };
}

const stores = createStores();
const StoresContext = createContext(stores);
const useStores = () => useContext(StoresContext);

function useSmartDataStore() {
    const {smart_data} = useStores();
    return smart_data;
}

function usePostListDataStore() {
    const {post_list_data} = useStores()
    return post_list_data
}

const smartDataStore = stores[SMART_DATA];
const postListDataStore = stores[POST_LIST_DATA];

export {
    stores,
    StoresContext,
    useStores,

    smartDataStore,
    useSmartDataStore,

    postListDataStore,
    usePostListDataStore

};
