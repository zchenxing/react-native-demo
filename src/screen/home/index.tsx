import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {globalStyles} from '../../assets/styles';
import HomeHeader from './header';
import {NavigateProps} from '../../interface';
import ScreenBase from '../components/screen-base';
import {INTELINK_SCREEN_NAME} from '../../config/page-name';
import PostList from '../components/post-list';
import { postList } from "../../mock";

const HomeScreen: React.FC<NavigateProps> = (props: NavigateProps) => {

    const [refreshing, setRefreshing] = React.useState(false)
    const [moreLoading, setMoreLoading] = React.useState(false)


    const onRefreshData = () => {
        setRefreshing(true);

        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }


    const onLoadMoreData = () => {
        setMoreLoading(true);

        setTimeout(() => {
            setMoreLoading(false);
        }, 2000);
    }



    const onPressSearch = () => {
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_SEARCH);
    };

    const onPublish = () => {
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_PUBLISH)
    };

    return (
        <SafeAreaProvider style={globalStyles.container}>
            <HomeHeader onSearch={onPressSearch} onPublish={onPublish} />
            <ScreenBase>
                <PostList
                    dataSource={postList}
                    refreshing={refreshing}
                    moreLoading={moreLoading}
                    onRefreshData={onRefreshData}
                    onLoadMoreData={onLoadMoreData}
                />
            </ScreenBase>
        </SafeAreaProvider>
    );
};

export default HomeScreen;
