import React from 'react';

import { Container, Text } from './styles';

export default function Button({ content, ...rest }) {
  return (
    <Container {...rest}>
      <Text>{content}</Text>
    </Container>
  );
}
