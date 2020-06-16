import React from 'react';

import {ActivityIndicator} from 'react-native';

import {Container, Text} from './styles';

export default function Button({content, loading, color, ...rest}) {
  return (
    <Container color={color} {...rest}>
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <Text>{content}</Text>
      )}
    </Container>
  );
}
