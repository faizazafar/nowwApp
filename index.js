/**
 * @format
 */

import "react-native-gesture-handler";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import { AppRegistry } from "react-native";
import React from "react";
import App from "./App";
import { name as appName } from "./app.json";
import { Provider } from "react-redux";
import "./src/i18/i18n.config";
import { PersistGate } from "redux-persist/integration/react";

import configureStore from "./src/redux/store";
import { LanguageProvider } from "./src/js/common/components/languageProvider";

const { store, persistor } = configureStore();

const RNRedux = () => (
  <LanguageProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </LanguageProvider>
);

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(RNRedux));
