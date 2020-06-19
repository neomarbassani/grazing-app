import React from 'react';

import Container from '../../layout/App';

import ProgressBar from '../../components/ProgressBar';
import CalcHeader from '../../components/CalcHeader';
import Button from '../../components/Button';

import logo from '../../assets/logoResults.png';
import backgroundImage from '../../assets/background-form-azevem.png';

import {Description, ResultText, Title, Logo, Content} from './styles';

const Result = ({navigation, route}) => {
  const teste = route.params;

  console.log(teste);

  return (
    <Container results source={backgroundImage}>
      <ProgressBar size={100} />
      <CalcHeader color="#fff" />
      <Content>
        <Logo source={logo} />
        <Title>Resultado</Title>
        <Description>Número de animais no potreiro</Description>
        <ResultText>40</ResultText>
        <Button content="Voltar ao início" mt="auto" />
      </Content>
    </Container>
  );
};

export default Result;
