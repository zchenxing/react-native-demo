import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {globalStyles} from '../../../assets/styles';
import SearchNavigator from '../search-navigator';
import {NavigateProps} from '../../../interface';
import PostList from '../../components/post-list';
import { INTELINK_SCREEN_NAME } from "../../../routes/screen-name";
import apis from '../../../network/apis';

const SearchResultScreen: React.FC<NavigateProps> = (props: NavigateProps) => {

    const searchName = props.route.params.searchResult

    const onPressDetail = () => {
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_POST_DETAIL)
    }

    const onPressPersonal = () => {
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_PERSONAL)
    }

    return (
        <>
            <SearchNavigator
                defaultValue={searchName}
                editDisable={true}
                onLeftPress={props.navigation.goBack}
                onPressDisableInput={props.navigation.goBack}
            />

            <PostList
                api={apis.post.search}
                apiParam={searchName}
                listId={INTELINK_SCREEN_NAME.SCREEN_SEARCH_RESULT}
                onPressPersonal={onPressPersonal}
                onPressDetail={onPressDetail}
            />

        </>
    );
};

export default SearchResultScreen;
