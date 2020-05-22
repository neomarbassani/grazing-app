import React from 'react';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';

import createRouter from './routes';

export default function App() {
  const { signed, autenticated } = useSelector((state) => state.auth);

  const prefix = Platform.OS === 'ios' ? 'grazing://' : 'grazing://grazing/';

  const Routes = createRouter(signed, autenticated);

  return <Routes uriPrefix={prefix} />;
}
