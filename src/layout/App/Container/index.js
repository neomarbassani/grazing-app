/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { Container, ScroolView } from './styles';
import Background from '../Background';

import { StatusBar } from 'react-native';

export default function AuthContainer({ children }) {
  return (
    <Background>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
        translucent={true}
      />
      <Container>
        <ScroolView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'flex-start',
            padding: 30,
            alignItems: 'center',
          }}>
          {children}
        </ScroolView>
      </Container>
    </Background>
  );
}
