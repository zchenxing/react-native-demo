import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {globalStyles} from '../../../assets/styles';
import AweSearchNavigator from '../../../components/awe-search-header';
import {NavigateProps} from '../../../interface';
import ScreenBase from '../../components/screen-base';
import PostList from '../../components/post-list';
import { postList } from "../../../mock";

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


    return (
        <SafeAreaProvider style={globalStyles.container}>
            <AweSearchNavigator
                defaultValue={params.searchResult}
                editDisable={true}
                onLeftPress={props.navigation.goBack}
            />

            <ScreenBase
                nothingPage={{
                    picture: require('../../../assets/images/status/search_nothing.png'),
                    title: 'No result found'
                }}
            >
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

export default SearchResultScreen;
