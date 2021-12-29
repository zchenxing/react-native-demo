import { action, observable } from 'mobx'
import { UserInfoProps } from "../interface/work";
import server from "../network";
import apis from "../network/apis";

export class SelfInfoDataStore {

    @observable selfInfoData: UserInfoProps | null = null

    @action.bound setSelfInfoData = (values: UserInfoProps) => {
        this.selfInfoData = values
    }

    getSelfInfo = async () => {

        try {
            const res = await server.get(apis.user.myself)
            console.log('\n\n获取用户信息:', res.data);

            this.setSelfInfoData(res.data)
        } catch (err) {
            console.log(err);
        }

    }
}
