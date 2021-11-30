import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import { Provider } from 'mobx-react'
import { stores, StoresContext } from "./src/mobx/provider";

const Root = () => {
    return (
        <Provider {...stores}>
            <StoresContext.Provider value={stores}>
                <App />
            </StoresContext.Provider>
        </Provider>
    )
}


AppRegistry.registerComponent(appName, () => Root);
