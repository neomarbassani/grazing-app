import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import { store, persistor } from './store';

const Index = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <StatusBar />
      <App />
    </PersistGate>
  </Provider>
);

export default Index;
