import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {globalStyles} from '../../../assets/styles';
import SearchNavigator from '../search-navigator';
import {NavigateProps} from '../../../interface';
import ScreenBase from '../../components/screen-base';
import PostList from '../../components/post-list';
import { postList } from "../../../mock";
import { INTELINK_SCREEN_NAME } from "../../../routes/screen-name";
import apis from "../../../network/apis";

const SearchResultScreen: React.FC<NavigateProps> = (props: NavigateProps) => {

    const params = React.useRef(props.route.params).current

    const [refreshing, setRefreshing] = React.useState(false)
    const [moreLoading, setMoreLoading] = React.useState(false)

    React.useEffect(() => {
        console.log(params.searchResult);
    }, [])


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


    const onPressDetail = () => {
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_POST_DETAIL)
    }

    const onPressPersonal = () => {
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_PERSONAL)
    }

    return (
        <SafeAreaProvider style={globalStyles.container}>
            <SearchNavigator
                defaultValue={params.searchResult}
                editDisable={true}
                onLeftPress={props.navigation.goBack}
                onPressDisableInput={props.navigation.goBack}
            />

            <ScreenBase
                // nothingPage={{
                //     picture: require('../../../assets/images/status/search_nothing.png'),
                //     title: 'No result found'
                // }}
            >
                <PostList
                    api={apis.post.search}
                    dataSource={postList}
                    refreshing={refreshing}
                    moreLoading={moreLoading}
                    onPressDetail={onPressDetail}
                    onRefreshData={onRefreshData}
                    onLoadMoreData={onLoadMoreData}
                    onPressPersonal={onPressPersonal}/>
            </ScreenBase>
        </SafeAreaProvider>
    );
};

export default SearchResultScreen;
