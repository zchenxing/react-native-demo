import {createContext, useContext} from 'react';
import {SMART_DATA} from './constant';
import {SmartDataStore} from './smart-data';

function createStores() {
    return {
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

const smartDataStore = stores[SMART_DATA];

export {
    stores,
    StoresContext,
    useStores,

    smartDataStore,
    useSmartDataStore,

};
