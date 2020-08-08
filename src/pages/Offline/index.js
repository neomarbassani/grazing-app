import React from 'react';
import {StatusBar, Platform} from 'react-native';

import {Container, Animation, Logo} from './styles';

import offlineAnimation from '../../assets/animation/offlineAnimation.json';

const Offline = () => {
  return (
    <Container>
      <StatusBar
        barStyle={Platform.OS === 'android' ? 'dark-content' : 'light-content'}
        backgroundColor="#fff"
        translucent={true}
      />
      <Animation source={offlineAnimation} autoPlay={true} loop={true} />
    </Container>
  );
};

export default Offline;
