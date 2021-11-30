
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
        push: (name: string) => void;
        removeListener: () => void;
        replace: () => void;
        reset: () => void;
        setOptions: any;
        setParams: () => void;
    };
    route: {
        key: string;
        name: string;
        params: any;
        path: string;
    };
}
