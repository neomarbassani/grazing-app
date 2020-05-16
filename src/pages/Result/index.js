import React from 'react';

import backgroundResult from '../../assets/backgroundResult.png';
import logoResults from '../../assets/logoResults.png';

import {
  Container,
  ContainerBackground,
  Logo,
  ResultBox,
  ResultBoxTitle,
  ResultText,
  Link,
} from './styles';

const Result = ({ navigation }) => {
  return (
    <ContainerBackground source={backgroundResult}>
      <Container>
        <Logo source={logoResults} />
        <ResultBoxTitle>Seu resultado foi:</ResultBoxTitle>
        <ResultBox>
          <ResultText>59 animais</ResultText>
        </ResultBox>
        <Link onPress={() => navigation.navigate('Home')}>
          Ir para a tela inicial
        </Link>
      </Container>
    </ContainerBackground>
  );
};

export default Result;
