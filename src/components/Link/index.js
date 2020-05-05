import React from 'react';

import { Container } from './styles';

export default function Link({ navigation, content, mt, mb, color, ...rest }) {
  return (
    <Container color={color} mt={mt} mb={mb} {...rest}>
      {content} >
    </Container>
  );
}
