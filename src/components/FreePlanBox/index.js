import React from 'react';
import { Container, Text } from './styles';
import Link from '../Link';

const FreePlanBox = () => {
  return (
    <Container>
      <Text>Você tem 30 dias grátis</Text>
      <Link content="Assinar plano agora" color="#D69D2B" />
    </Container>
  );
};

export default FreePlanBox;
