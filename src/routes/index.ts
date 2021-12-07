import {INTELINK_SCREEN_NAME} from '../config/page-name';
import HomeScreen from '../screen/home';
import SearchScreen from '../screen/search';

export const intelinkRoute = [
    {
        name: INTELINK_SCREEN_NAME.SCREEN_HOME,
        component: HomeScreen,
        options: {
            headerShown: false
        },
    },
    {
        name: INTELINK_SCREEN_NAME.SCREEN_SEARCH,
        component: SearchScreen,
        options: {
            headerShown: false
        },
    }
];
