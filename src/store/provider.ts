import {createContext, useContext} from 'react';
import {SHEET_COMMENT_DATA, SMART_DATA} from './constant';
import {SmartDataStore} from './smart-data';
import { CommentSheetStore } from "./comment-sheet-store";

function createStores() {
    return {
        [SHEET_COMMENT_DATA]: new CommentSheetStore(),
        [SMART_DATA]: new SmartDataStore(),
    };
}

const stores = createStores();
const StoresContext = createContext(stores);
const useStores = () => useContext(StoresContext);

function useSmartDataStore() {
    const {smart_data} = useStores();
    return smart_data;
}

function useSheetDataStore() {
    const {sheet_comment_data} = useStores()
    return sheet_comment_data
}

const smartDataStore = stores[SMART_DATA];
const sheetDataStore = stores[SHEET_COMMENT_DATA];

export {
    stores,
    StoresContext,
    useStores,

    smartDataStore,
    useSmartDataStore,

    sheetDataStore,
    useSheetDataStore,
};
