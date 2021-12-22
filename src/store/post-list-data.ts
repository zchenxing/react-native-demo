import { action, observable } from 'mobx'
import { PostContentProps } from "../interface/work";

export class PostListDataStore {

    @observable postStoreData: PostContentProps[] = []

    @action.bound setPostStoreData = (dataSource: PostContentProps[]) => {
        this.postStoreData = [...dataSource]
    }



}
