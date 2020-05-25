import React from 'react';
import { StatusBar } from 'react-native';

import { Container, Animation, Logo } from './styles';

import offlineAnimation from '../../assets/animation/offlineAnimation.json';

const Offline = () => {
  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
        translucent={true}
      />
      <Animation source={offlineAnimation} autoPlay={true} loop={true} />
    </Container>
  );
};

export default Offline;
