import { action, observable } from 'mobx'

export class SmartDataStore {

    @observable publishTagId: string = ''

    @action.bound setPublishTagId = (id: string) => {
        this.publishTagId = id
    }

}
