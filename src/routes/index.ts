import {INTELINK_SCREEN_NAME} from './screen-name';
import HomeScreen from '../screen/home';
import SearchScreen from '../screen/search';
import SearchResultScreen from '../screen/search/result-list';
import PublishScreen from '../screen/publish';
import PublishTagScreen from "../screen/publish/choose-tag";
import PostDetailScreen from "../screen/post-detail";
import PersonalScreen from "../screen/personal";

type routeProps = {
    name: string
    component: any
    options?: any
}

export const intelinkRoute: routeProps[] = [
    {
        name: INTELINK_SCREEN_NAME.SCREEN_HOME,
        component: HomeScreen,

    },
    {
        name: INTELINK_SCREEN_NAME.SCREEN_SEARCH,
        component: SearchScreen,

    },
    {
        name: INTELINK_SCREEN_NAME.SCREEN_SEARCH_RESULT,
        component: SearchResultScreen,

    },
    {
        name: INTELINK_SCREEN_NAME.SCREEN_PUBLISH,
        component: PublishScreen,
    },
    {
        name: INTELINK_SCREEN_NAME.SCREEN_PUBLISH_TAG,
        component: PublishTagScreen
    },
    {
        name: INTELINK_SCREEN_NAME.SCREEN_POST_DETAIL,
        component: PostDetailScreen
    },
    {
        name: INTELINK_SCREEN_NAME.SCREEN_PERSONAL,
        component: PersonalScreen
    }
];
