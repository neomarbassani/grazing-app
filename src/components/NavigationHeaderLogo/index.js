import React from 'react';

import { Container } from './styles';

import logoHeader from '../../assets/logoHeader.png';

const NavigationHeaderLogo = ({ size, round, ...rest }) => {
  return <Container size={size} {...rest} source={logoHeader} />;
};

export default NavigationHeaderLogo;
