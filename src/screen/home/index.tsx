import React from 'react';
import HomeNavigator from './navigator';
import {NavigateProps} from '../../interface';
import ScreenBase from '../components/screen-base';
import {INTELINK_SCREEN_NAME} from '../../routes/screen-name';
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


    const onPressPersonal = () => {
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_PERSONAL)
    }

    const onPressDetail = () => {
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_POST_DETAIL, {
            id: '124012750128740912804912'
        })
    }

    return (
        <>
            <HomeNavigator onSearch={onPressSearch} onPublish={onPublish} />
            <ScreenBase>
                <PostList
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
