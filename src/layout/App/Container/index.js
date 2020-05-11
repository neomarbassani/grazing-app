/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { Container, ScroolView } from './styles';
import Background from '../Background';

export default function AuthContainer({ children }) {
  return (
    <Background>
      <Container>
        <ScroolView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'flex-start',
            padding: 20,
            alignItems: 'center',
          }}>
          {children}
        </ScroolView>
      </Container>
    </Background>
  );
}
