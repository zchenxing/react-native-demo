import { action, observable } from 'mobx'
import { UserInfoProps } from "../interface/work";
import server from '../network';
import apis from '../network/apis';
import myToken from '../network/token';

export class SelfInfoDataStore {

    @observable selfInfoData: UserInfoProps | null = null

    @action.bound setSelfInfoData = (values: UserInfoProps) => {
        this.selfInfoData = values
    }

    getSelfInfo = async () => {
        if (myToken.token) {
            try {
                const res = await server.get(apis.user.myself)
                this.setSelfInfoData(res.data)
                return Promise.resolve(res)
            } catch (err) {
                console.log('----', err);
                return Promise.reject(err)
            }
        } else {
            return Promise.resolve()
        }

    }
}
