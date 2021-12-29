import { UserInfoProps } from "../../../interface/work";

export interface UserNavigatorProps {
    // userInfo: { nickname: string, avatar: string} | null
    userInfo: UserInfoProps | undefined
    isFollow: boolean;
    followLoading: boolean;
    backgroundColor?: string,
    goBack: () => void;
    onChangeFollow: () => void;
}
