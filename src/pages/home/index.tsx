import React from 'react';
import { StatusBar, View } from "react-native";
import AweButton from '../../components/awe-button';
import {PAGE_NAME} from '../../routes/screen-name';
import {NavigateProps} from '../../interface';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Home: React.FC<NavigateProps> = (props: NavigateProps) => {
    const onPageNavigation = (pageName: string) => {
        props.navigation.navigate(pageName);
    };

    return (
        <SafeAreaProvider style={{flex: 1}}>
            <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
            <View style={{height: '100%'}}>
                <AweButton
                    backgroundColor="#ad6800"
                    color="#fcffe6"
                    onPress={() => onPageNavigation(PAGE_NAME.SQUARE)}>
                    广场
                </AweButton>
                <AweButton
                    backgroundColor="#ad6800"
                    color="#fcffe6"
                    onPress={() => onPageNavigation(PAGE_NAME.PUBLISH)}>
                    发布
                </AweButton>
                <AweButton
                    backgroundColor="#ad6800"
                    color="#fcffe6"
                    onPress={() => onPageNavigation(PAGE_NAME.TOPIC)}>
                    话题
                </AweButton>

                <AweButton
                    backgroundColor="green"
                    color="#fcffe6"
                    onPress={() => onPageNavigation(PAGE_NAME.MY_NAVIGATION)}>
                    自定义导航
                </AweButton>

                <AweButton
                    backgroundColor="#87CEFA"
                    color="#000"
                    onPress={() => onPageNavigation(PAGE_NAME.MY_TAB)}>
                    react-native-elemnt-tabs
                </AweButton>

                <AweButton
                    backgroundColor="yellow"
                    color="#000"
                    onPress={() => onPageNavigation(PAGE_NAME.STORE_DATA)}>
                    状态管理
                </AweButton>

                <AweButton
                    backgroundColor="#2F4F4F"
                    color="#fff"
                    onPress={() => onPageNavigation(PAGE_NAME.IMAGE_VIEWING)}>
                    Image View
                </AweButton>

            </View>
        </SafeAreaProvider>

    );
};

export default Home;
