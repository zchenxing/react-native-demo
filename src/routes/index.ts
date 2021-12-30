import {INTELINK_SCREEN_NAME} from './screen-name';
import HomeScreen from '../screen/home';
import SearchScreen from '../screen/search';
import SearchResultScreen from '../screen/search/result-list';
import PostPublishScreen from '../screen/publish/post-publish';
import PublishTagScreen from '../screen/publish/choose-tag';
import PostDetailScreen from '../screen/post-detail';
import PersonalScreen from '../screen/personal';
import FollowListScreen from '../screen/personal/follow-list';
import Test1 from '../screen/test/test1';
import Test2 from '../screen/test/test2';
import PersonalPreviewScreen from '../screen/personal/personal-info';
import EditPersonalInfoScreen from "../screen/personal/edit-info";
import EntrustListScreen from "../screen/publish/quest-publish/entrust/index";
import EntrustDetailScreen from "../screen/publish/quest-publish/entrust/detail";
import EntrustRecordScreen from "../screen/publish/quest-publish/entrust/synchronousRecording";
import EntrustAcceptedScreen from "../screen/publish/quest-publish/entrust/accepted";
import EntrustSharingScreen from "../screen/publish/quest-publish/entrust/sharing";
import SharePublishScreen from "../screen/publish/share-publish";

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
        component: PostPublishScreen,
        options: {
            // 禁止返回手势
            gestureEnabled: false
        }
    },
    {
        name: INTELINK_SCREEN_NAME.SCREEN_PUBLISH_SHARE,
        component: SharePublishScreen,
        options: {
            // 禁止返回手势
            gestureEnabled: false
        }
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
    },
    {
        name: INTELINK_SCREEN_NAME.SCREEN_FOLLOW_LIST,
        component: FollowListScreen
    },
    {
        name: INTELINK_SCREEN_NAME.SCREEN_PREVIEW_PERSONAL_INFO,
        component: PersonalPreviewScreen
    },
    {
        name: INTELINK_SCREEN_NAME.SCREEN_EDIT_PERSONAL_INFO,
        component: EditPersonalInfoScreen
    },
    {
        name: 'Test1',
        component: Test1
    },
    {
        name: 'Test2',
        component: Test2
    },
    {
        name: INTELINK_SCREEN_NAME.SCREEN_ENTRUST_LIST,
        component: EntrustListScreen
    },
    {
        name: INTELINK_SCREEN_NAME.SCREEN_ENTRUST_DETAIL,
        component: EntrustDetailScreen
    },
    {
        name: INTELINK_SCREEN_NAME.SCREEN_ENTRUST_RECORDING,
        component: EntrustRecordScreen
    },
    {
        name: INTELINK_SCREEN_NAME.SCREEN_ENTRUST_ACCEPTED,
        component: EntrustAcceptedScreen
    },
    {
        name: INTELINK_SCREEN_NAME.SCREEN_ENTRUST_SHARING,
        component: EntrustSharingScreen
    }
];

export const EntrustRoute: routeProps[] = [
    {
        name: INTELINK_SCREEN_NAME.SCREEN_ENTRUST_LIST,
        component: EntrustListScreen
    }
]
