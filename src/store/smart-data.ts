import { action, observable } from 'mobx'

export class SmartDataStore {

    @observable publishTag: any = null

    @action.bound setPublishTag = (tag: any) => {
        this.publishTag = tag
    }

}
