import {INTELINK_SCREEN_NAME} from '../config/page-name';
import HomeScreen from '../screen/home';

export const intelinkRoute = [
    {
        name: INTELINK_SCREEN_NAME.SCREEN_HOME,
        component: HomeScreen,
        options: {
            headerShown: false
        },
    },
];
