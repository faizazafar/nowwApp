/**
 * @format
 */

import 'react-native-gesture-handler';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import './src/i18/i18n.config';


import configureStore from './src/redux/store';

const store = configureStore();

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(RNRedux));
