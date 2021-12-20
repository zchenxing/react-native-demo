import React from 'react';
import HomeNavigator from './navigator';
import {NavigateProps} from '../../interface';
import ScreenBase from '../components/screen-base';
import {INTELINK_SCREEN_NAME} from '../../routes/screen-name';
import PostList from '../components/post-list';
import {postList} from '../../mock';
import {useSheetDataStore} from '../../store/provider';
import { DeviceEventEmitter, View } from "react-native";

const HomeScreen: React.FC<NavigateProps> = (props: NavigateProps) => {

    const childRef = React.useRef<any>(null)
    const { deleteSheetId } = useSheetDataStore()
    const [refreshing, setRefreshing] = React.useState(false);
    const [moreLoading, setMoreLoading] = React.useState(false);


    React.useEffect(() => {
        const subscription = DeviceEventEmitter.addListener(
            INTELINK_SCREEN_NAME.SCREEN_HOME,
            params => {
                // 判断是否从sheet评论页面进入
                // 如果有参数，表示从评论进入了个人页面
                const sheetData = params[INTELINK_SCREEN_NAME.SCREEN_HOME];

                if (sheetData) {
                    childRef.current.openCommentSheet(sheetData.offsetY)
                    deleteSheetId(INTELINK_SCREEN_NAME.SCREEN_HOME)
                }
            },
        );

        return () => subscription.remove();
    }, []);

    const onRefreshData = () => {
        setRefreshing(true);

        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    };

    const onLoadMoreData = () => {
        setMoreLoading(true);

        setTimeout(() => {
            setMoreLoading(false);
        }, 2000);
    };

    const onPressSearch = () => {
        // props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_SEARCH);
        props.navigation.push('Test1')
    };

    const onPublish = () => {
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_PUBLISH);
    };

    const onPressPersonal = () => {
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_PERSONAL, {
            lastScreen: INTELINK_SCREEN_NAME.SCREEN_HOME,
        });
    };

    const onPressDetail = () => {
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_POST_DETAIL, {
            id: '124012750128740912804912',
        });
    };

    return (
        <>
            <HomeNavigator onSearch={onPressSearch} onPublish={onPublish} />
            <ScreenBase>
                <PostList
                    cRef={childRef}
                    sheetId={INTELINK_SCREEN_NAME.SCREEN_HOME}
                    dataSource={postList}
                    refreshing={refreshing}
                    moreLoading={moreLoading}
                    onPressPersonal={onPressPersonal}
                    onPressDetail={onPressDetail}
                    onRefreshData={onRefreshData}
                    onLoadMoreData={onLoadMoreData}
                />
            </ScreenBase>
        </>
    );
};

export default HomeScreen;
