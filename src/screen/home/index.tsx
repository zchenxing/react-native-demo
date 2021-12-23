import React from 'react';
import HomeNavigator from './navigator';
import {NavigateProps} from '../../interface';
import {INTELINK_SCREEN_NAME} from '../../routes/screen-name';
import PostList from '../components/post-list';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';
import {screenHeight} from '../../config/contant';
import {PostContentProps} from '../../interface/work';
import { useSelfDataStore } from "../../store/provider";
import {observer} from 'mobx-react'


const HomeScreen: React.FC<NavigateProps> = (props: NavigateProps) => {

    const {selfInfoData} = useSelfDataStore()

    const onPressSearch = () => {
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_SEARCH);
    };

    const onPublish = () => {
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_PUBLISH);
    };

    const onPressPersonal = () => {
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_PERSONAL);
    };

    const onPressDetail = (postContent: PostContentProps) => {
        console.log(postContent);
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_POST_DETAIL, {
            id: postContent.id,
        });
    };

    return (
        <>
            <HomeNavigator onSearch={onPressSearch} onPublish={onPublish} />

            <PostList
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
