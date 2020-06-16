import React from 'react';

import {Logo} from './styles';

import logo from '../../assets/logoWellcome.png';

export default function LogoHeader({mt, mb}) {
  return <Logo source={logo} mt={mt} mb={mb} />;
}
