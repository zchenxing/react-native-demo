export interface UserNavigatorProps {
    isFollow: boolean;
    followLoading: boolean;
    backgroundColor?: string,
    goBack: () => void;
    onChangeFollow: () => void;
}
