import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { intelinkRoute } from "./routes";
import { globalStyles } from "./assets/styles";
import myToken from "./network/token";
import { useSelfDataStore } from "./store/provider";

const Stack = createStackNavigator();

const App = () => {

    const { getSelfInfo } = useSelfDataStore()

    React.useEffect(() => {
        init()
    }, [])

    const init = async () => {
        await myToken.getToken()
        getSelfInfo()
    }

    return (
        <SafeAreaProvider style={globalStyles.container}>
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
