import React from 'react';
import { Platform } from 'react-native';
// import { useSelector } from 'react-redux';

import createRouter from './routes';

const prefix = Platform.OS === 'ios' ? 'grazing://' : 'grazing://grazing/';

export default function App() {
  // const signed = useSelector((state) => state.auth.signed);

  const Routes = createRouter();

  return <Routes uriPrefix={prefix} />;
}
