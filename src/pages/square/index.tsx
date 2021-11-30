import React from 'react';
import {View, SafeAreaView, StatusBar} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SquareCategory from './category';
import AweNavigator from '../../components/awe-navigator';
import {NavigateProps} from '../../interface';

const Tab = createMaterialTopTabNavigator();

const CategoryList: string[] = [
    '脊椎动物',
    '爬行动物',
    '两栖动物',
    '同城交友',
    '海洋生物',
    '飞行鸟类',
];

const Square: React.FC<NavigateProps> = (props: NavigateProps) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
            <AweNavigator
                title={'搜索'}
                actionRight={() => props.navigation.goBack()}
            />

            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <Tab.Navigator
                    screenOptions={{
                        tabBarItemStyle: {width: 'auto'},
                        tabBarLabelStyle: {height: 20},
                        tabBarStyle: {backgroundColor: 'powderblue'},
                        tabBarContentContainerStyle: {
                            height: 45
                        },
                        tabBarScrollEnabled: true,
                        lazy: true,
                        lazyPreloadDistance: 1111
                    }}>
                    {CategoryList.map(text => (
                        <Tab.Screen
                            initialParams={{name: `传入的参数: ${text}`}}
                            key={text}
                            name={text}
                            component={SquareCategory}
                        />
                    ))}
                </Tab.Navigator>
            </View>


        </SafeAreaView>
    );
};

export default Square;
