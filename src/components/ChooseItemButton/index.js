import React from 'react';

import { Container, Text } from './styles';

export default function ChooseItemButtom({ content, loading, ...rest }) {
  return (
    <Container underlayColor="#F7DAD4" {...rest}>
      <Text>{content}</Text>
    </Container>
  );
}
