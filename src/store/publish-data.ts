import { action, observable } from 'mobx'
import { UserInfoProps } from "../interface/work";
import server from "../network";
import apis from "../network/apis";

export class PublishDataStore {

    @observable publishData: any = {}

    @action.bound setPublishData = (values: any) => {
        this.publishData = values
    }


}
