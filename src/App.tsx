import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PAGE_NAME} from './config/page-name';
import Home from './pages/home';
import Square from './pages/square';
import Publish from './pages/publish';
import Topic from './pages/topic';

const Stack = createNativeStackNavigator();

const App = () => {


    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: true,
                    }}>
                    <Stack.Screen
                        name={PAGE_NAME.HOME}
                        component={Home}
                        options={{title: '首页'}}
                    />
                    <Stack.Screen
                        name={PAGE_NAME.SQUARE}
                        component={Square}
                        options={{
                            headerShown: false,
                        }}

                    />
                    <Stack.Screen
                        name={PAGE_NAME.PUBLISH}
                        component={Publish}
                        options={{title: '发布'}}
                    />
                    <Stack.Screen
                        name={PAGE_NAME.TOPIC}
                        component={Topic}
                        options={{title: '话题'}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default App;
