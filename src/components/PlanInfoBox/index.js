import React from 'react';
import { Container, Content, Text } from './styles';
import Link from '../Link';

const PlanInfoBox = () => {
  return (
    <Container>
      <Content>
        <Text>Plano</Text>
        <Text>Gratuito</Text>
      </Content>
      <Content>
        <Text>Expira em 10 dias</Text>
        <Link content="Pagar" color="#D69D2B" />
      </Content>
    </Container>
  );
};

export default PlanInfoBox;
