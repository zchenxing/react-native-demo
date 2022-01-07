import React from 'react';
import SearchNavigator from '../search-navigator';
import {NavigateProps} from '../../../interface';
import PostList from '../../components/post-list';
import { INTELINK_SCREEN_NAME } from "../../../routes/screen-name";
import apis from '../../../network/apis';
import { localImages } from "../../../assets/images";
import { useLanguage } from "../../../language";
import { PostContentProps } from "../../../interface/work";

const SearchResultScreen: React.FC<NavigateProps> = (props: NavigateProps) => {

    const searchName = props.route.params.searchResult

    const onPressDetail = (postContent: PostContentProps, rowIndex: number) => {
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_POST_DETAIL, {
            postId: postContent.id,
            // 当修改评论时，来自搜索页面数据的评论个数也需要修改
            fromListId: INTELINK_SCREEN_NAME.SCREEN_SEARCH_RESULT,
            rowIndex: rowIndex,
        })
    }

    const onPressPersonal = (userId: string) => {
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_PERSONAL, {
            userId
        })
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
                nothingImg={localImages.search}
                nothingTitle={useLanguage.no_result_found}
                listId={INTELINK_SCREEN_NAME.SCREEN_SEARCH_RESULT}
                onPressPersonal={onPressPersonal}
                onPressDetail={onPressDetail}
            />

        </>
    );
};

export default SearchResultScreen;
