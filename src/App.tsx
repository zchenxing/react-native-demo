import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {elRoutes} from './routes/test-routes';
import { intelinkRoute } from "./routes";

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: true,
                    }}>
                    {intelinkRoute.map(screen => {
                        return (
                            <Stack.Screen
                                key={screen.name}
                                name={screen.name}
                                component={screen.component}
                                options={screen.options ? screen.options : {}}
                            />
                        );
                    })}
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default App;
