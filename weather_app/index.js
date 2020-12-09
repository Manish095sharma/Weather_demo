

import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from "react-redux";
import App from './App';
import { createStore, applyMiddleware } from "redux";
import middleWare from "redux-thunk";
import rootReducers from "./src/store/index";

import { name as appName } from './app.json';
const store = createStore(rootReducers, applyMiddleware(middleWare));
const AppContainer = () => (
    <Provider store={store}>
        <App />
    </Provider>
);
AppRegistry.registerComponent(appName, () => AppContainer);
