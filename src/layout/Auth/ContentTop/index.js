import React from 'react';
import { Platform } from 'react-native';

import { Container } from './styles';

export default function AuthContentTop({ children }) {
  return (
    <Container
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      {children}
    </Container>
  );
}
