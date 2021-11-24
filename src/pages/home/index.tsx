import React from 'react';
import {View} from 'react-native';
import AweButton from '../../components/awe-button';
import {PAGE_NAME} from '../../config/page-name';
import {NavigateProps} from '../../interface';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Home: React.FC<NavigateProps> = (props: NavigateProps) => {
    const onPageNavigation = (pageName: string) => {
        props.navigation.navigate(pageName);
    };

    return (
        <SafeAreaProvider style={{flex: 1}}>
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
                    主题
                </AweButton>
            </View>
        </SafeAreaProvider>

    );
};

export default Home;
