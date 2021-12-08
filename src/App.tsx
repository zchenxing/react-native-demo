import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {elRoutes} from './routes/test-routes';
import { intelinkRoute } from "./routes";

const Stack = createStackNavigator();

const App = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}>
                    {intelinkRoute.map(screen => {
                        return (
                            <Stack.Screen
                                key={screen.name}
                                name={screen.name}
                                component={screen.component}
                                options={{
                                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                                    ...screen.options

                                }}
                            />
                        );
                    })}
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default App;
