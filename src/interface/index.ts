
export interface NavigateProps {
    navigation: {
        // addListener: (event: string, func: (e: any) => void) => void;
        addListener: any;
        canGoBack: () => void;
        dispatch: () => void;
        getParent: () => void;
        getState: () => void;
        goBack: () => void;
        isFocused: () => void;
        navigate: any;
        pop: () => void;
        popToTop: () => void;
        push: (name: string, params?: any) => void;
        removeListener: () => void;
        replace: () => void;
        reset: () => void;
        setOptions: any;
        setParams: () => void;
        [propName: string]: any;
    };
    route: {
        key: string;
        name: string;
        params: any;
        path: string;
    },

}


// 本地图片接口
export interface PictureProps {
    path: string;
    fileName: string;
    localIdentifier: string;
    width: number;
    height: number;
    mime: string;
    type: string;
    size: number;
    bucketId?: number;
    realPath?: string;
    parentFolderName?: string;
    thumbnail?: string;
    creationDate?: string;
    uri: string | any
}




