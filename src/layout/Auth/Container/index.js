/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StatusBar } from 'react-native';

import { Container, ScroolView } from './styles';

import { colors } from '../../../styles';

export default function AuthContainer({ children }) {
  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background}
        translucent={true}
      />
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
