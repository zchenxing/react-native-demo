import {createContext, useContext} from 'react';
import {ListStore} from './list-store';
import {LIST_DATA, SMART_DATA} from './constant';
import {SmartDataStore} from './smart-data';

function createStores() {
    return {
        [LIST_DATA]: new ListStore(),
        [SMART_DATA]: new SmartDataStore(),
    };
}

const stores = createStores();
const StoresContext = createContext(stores);
const useStores = () => useContext(StoresContext);

function useListDataStore() {
    const {list_data} = useStores();
    return list_data;
}

function useSmartDataStore() {
    const {smart_data} = useStores();
    return smart_data;
}

const listDataStore = stores[LIST_DATA];
const smartDataStore = stores[SMART_DATA];

export {
    stores,
    StoresContext,
    useStores,
    listDataStore,
    useListDataStore,
    smartDataStore,
    useSmartDataStore,
};
