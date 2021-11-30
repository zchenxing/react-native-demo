import { action, observable } from 'mobx'

export class ListStore {

    @observable listData: any[] = []
    @observable count: number = 1

    @action.bound setListData = (data: any[]) => {
        this.listData = data
    }


    @action.bound resetCount = (value: number) => {
        this.count = value
    }

}
