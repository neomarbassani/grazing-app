import React from 'react';
import {Platform} from 'react-native';
import {useSelector} from 'react-redux';

import Routes from './routes';

export default function App() {
  const {signed, autenticated} = useSelector(state => state.auth);

  const {isConnected} = useSelector(state => state.offline);

  const prefix = Platform.OS === 'ios' ? 'grazing://' : 'grazing://grazing/';

  return (
    <Routes
      isConnected={isConnected}
      signed={signed}
      autenticated={autenticated}
      uriPrefix={prefix}
    />
  );
}
