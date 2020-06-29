import React from 'react';

import {
  Logo,
  TextBox,
  TextBoxItem,
  TextBoxItemPrice,
  TextBoxItemText,
} from './styles';

import logo from '../../assets/logo_white.png';
import background from '../../assets/planoff.jpg';

import Container from '../../layout/App';

import Button from '../../components/Button';

const PlanOff = () => {
  return (
    <Container
      results
      source={background}
      resizeMethod="resize"
      resizeMode="cover">
      <Logo source={logo} />
      <TextBox>
        <TextBoxItem>
          <TextBoxItemText>
            Seu período de teste acabou 😢. Para continuar usando nosso
            aplicativo assine o plano a seguir.
          </TextBoxItemText>
        </TextBoxItem>
        <TextBoxItem color="#C94324">
          <TextBoxItemPrice>R$32,90</TextBoxItemPrice>
        </TextBoxItem>
      </TextBox>
      <Button content="Assine agora >" mt={20} mb={16} size="90%" />
    </Container>
  );
};

export default PlanOff;
