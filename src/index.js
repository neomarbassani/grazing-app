import React from 'react';
import {Provider} from 'react-redux';
import {YellowBox} from 'react-native';

import {PersistGate} from 'redux-persist/integration/react';

import App from './App';
import {store, persistor} from './store';

const Index = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

export default Index;

console.disableYellowBox = true;
YellowBox.ignoreWarnings(['Warning']);
