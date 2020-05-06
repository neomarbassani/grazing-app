/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { Container, ScroolView } from './styles';

export default function AuthContainer({ children }) {
  return (
    <Container>
      <ScroolView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
          padding: 20,
          alignItems: 'center',
        }}>
        {children}
      </ScroolView>
    </Container>
  );
}
