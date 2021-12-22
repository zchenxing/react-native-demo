import React from 'react';
import HomeNavigator from './navigator';
import {NavigateProps} from '../../interface';
import ScreenBase from '../components/screen-base';
import {INTELINK_SCREEN_NAME} from '../../routes/screen-name';
import PostList from '../components/post-list';
import apis from '../../network/apis';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';
import {screenHeight} from '../../config/contant';
import server from '../../network';
import apiConfig from '../../network/config';
import {PostContentProps} from '../../interface/work';
import {useSetState} from 'ahooks';

interface IState {

}

const HomeScreen: React.FC<NavigateProps> = (props: NavigateProps) => {
    const [state, setState] = useSetState<IState>({

    });


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
            id: '124012750128740912804912',
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
                <Text>登录</Text>
            </TouchableHighlight>
            <TouchableHighlight
                style={styles.test}
                activeOpacity={1}
                underlayColor={'white'}
                onPress={() => {
                    props.navigation.push('EntrustList');
                }}>
                <Text>委托</Text>
            </TouchableHighlight>
        </>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    login: {
        position: 'absolute',
        width: 40,
        height: 40,
        bottom: screenHeight / 4,
        right: 20,
        zIndex: 100,
        backgroundColor: '#f1f1f1',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    test: {
        position: 'absolute',
        width: 40,
        height: 40,
        bottom: screenHeight / 3,
        right: 20,
        zIndex: 100,
        backgroundColor: '#f1f1f1',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
