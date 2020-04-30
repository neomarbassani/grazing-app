import React from 'react';
import { useSelector } from 'react-redux';

import createRouter from './routes';

export default function App() {
  const signed = useSelector((state) => state.auth.signed);
  console.log(signed);

  const Routes = createRouter();

  return <Routes />;
}
