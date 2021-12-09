import Home from '../pages/home';
import {PAGE_NAME} from './screen-name';
import Square from '../pages/square';
import Publish from '../pages/publish';
import Topic from '../pages/topic';
import MyNavigation from '../pages/navigation';
import StoreData from '../pages/store-data';
import MyTab from '../pages/tab';
import ImageViewing from "../pages/image-viewing";

export const elRoutes = [
    {
        name: PAGE_NAME.HOME,
        component: Home,
        options: {title: '首页'},
    },
    {
        name: PAGE_NAME.SQUARE,
        component: Square,
        options: {headerShown: false},
    },
    {
        name: PAGE_NAME.PUBLISH,
        component: Publish,
        options: {title: '发布'},
    },
    {
        name: PAGE_NAME.TOPIC,
        component: Topic,
        options: {title: '话题'},
    },
    {
        name: PAGE_NAME.MY_NAVIGATION,
        component: MyNavigation,
        options: {headerShown: false},
    },
    {
        name: PAGE_NAME.STORE_DATA,
        component: StoreData,
        options: {title: '状态管理'}
    },
    {
        name: PAGE_NAME.MY_TAB,
        component: MyTab,
        options: {title: '自定义导航'},
    },
    {
        name: PAGE_NAME.IMAGE_VIEWING,
        component: ImageViewing,
        options: {title: '图片浏览'},
    },
];
