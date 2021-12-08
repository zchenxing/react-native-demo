import {INTELINK_SCREEN_NAME} from '../config/page-name';
import HomeScreen from '../screen/home';
import SearchScreen from '../screen/search';
import SearchResultScreen from '../screen/search/result-list';
import PublishScreen from '../screen/publish';

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
    }
];
