/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StatusBar} from 'react-native';

import {Container, Background} from './styles';

export default function AuthContainer({children}) {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
        translucent={true}
      />
      <Background>
        <Container>{children}</Container>
      </Background>
    </>
  );
}
