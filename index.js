import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-url-polyfill/auto';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore.js';

const store = configureStore()
const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux);
