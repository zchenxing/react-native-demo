import {createContext, useContext} from 'react';
import {ListStore} from './list-store';
import {LIST_DATA} from './constant';

function createStores() {
    return {
        [LIST_DATA]: new ListStore(),
    };
}

const stores = createStores();
const StoresContext = createContext(stores);
const useStores = () => useContext(StoresContext);

function useListDataStore() {
    const {list_data} = useStores();
    return list_data;
}

const listDataStore = stores[LIST_DATA];

export {stores, StoresContext, useStores, listDataStore, useListDataStore};
