import React from 'react';

import Link from '../../components/Link';
import Button from '../../components/Button';

import backgroundImage1 from '../../assets/wellcome-background1.png';
import backgroundImage2 from '../../assets/wellcome-background2.png';
import backgroundImage3 from '../../assets/wellcome-background3.png';

import logo from '../../assets/logoWellcome.png';

import {
  Container,
  Background,
  BottomBox,
  BottomBoxText,
  Logo,
  Separator,
} from './styles';

const Wellcome = ({navigation}) => {
  return (
    <Background source={backgroundImage1}>
      <Container>
        <Logo source={logo} />
        <BottomBox>
          <BottomBoxText>
            Maneje o seu pasto da forma adequada para otimizar a produtividade
          </BottomBoxText>
          <Separator />
          <Link
            content="Já tenho conta"
            color="#774D37"
            mb={15}
            onPress={() => navigation.navigate('Login')}
          />
          <Button
            content="Criar conta"
            color="#774D37"
            onPress={() => navigation.navigate('Register')}
          />
        </BottomBox>
      </Container>
    </Background>
  );
};

export default Wellcome;
