import React from 'react';
import HomeNavigator from './navigator';
import {NavigateProps} from '../../interface';
import {INTELINK_SCREEN_NAME} from '../../routes/screen-name';
import PostList from '../components/post-list';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';
import {screenHeight} from '../../config/contant';
import {PostContentProps} from '../../interface/work';
import { useCommentDataStore, useSelfDataStore } from "../../store/provider";
import {observer} from 'mobx-react'
import apis from '../../network/apis';
import { PostType } from "../../enum";


const HomeScreen: React.FC<NavigateProps> = (props: NavigateProps) => {

    const {selfInfoData} = useSelfDataStore()
    const {resetCommentData} = useCommentDataStore()

    const onPressSearch = () => {
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_SEARCH);
    };

    const onPublish = () => {
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_PUBLISH, {
            postType: PostType.Normal
        });
    };

    const onPressPersonal = (userId: string) => {
        // resetCommentData('')
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_PERSONAL, {
            listId: userId,
            userId
        });
    };

    const onPressDetail = (postContent: PostContentProps, rowIndex: number) => {
        // 重置首页评论数据
        resetCommentData(INTELINK_SCREEN_NAME.SCREEN_HOME)
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_POST_DETAIL, {
            postId: postContent.id,
            // 当修改评论时，来自主页数据的评论个数也需要修改
            fromListId: INTELINK_SCREEN_NAME.SCREEN_HOME,
            rowIndex
        });
    };

    return (
        <>
            <HomeNavigator onSearch={onPressSearch} onPublish={onPublish} />

            <PostList
                api={apis.post.list}
                listId={INTELINK_SCREEN_NAME.SCREEN_HOME}
                onPressPersonal={onPressPersonal}
                onPressDetail={onPressDetail}
            />

            <TouchableHighlight
                style={styles.login}
                onPress={() => {
                    props.navigation.push('Test1');
                }}>
               <>
                   <Text>登录</Text>
                   <Text>{selfInfoData?.id}</Text>
                   <Text>{selfInfoData?.nickname}</Text>
               </>
            </TouchableHighlight>
        </>
    );
};

export default observer(HomeScreen);

const styles = StyleSheet.create({
    login: {
        position: 'absolute',
        minWidth: 40,
        height: 40,
        bottom: screenHeight / 4,
        right: 20,
        zIndex: 100,
        backgroundColor: '#f1f1f1',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: .3
    },
});
