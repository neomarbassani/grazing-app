/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import backgroundLogo from '../../assets/backgroundLogo.png';

import Container from '../../layout/App';
import logo from '../../assets/logoHorizontal.png';

import SubTitle from '../../components/SubTitle';
import CalcHeader from '../../components/CalcHeader';
import PlanInfoBox from '../../components/PlanInfoBox';

import {Content, Logo, Text, TextBold} from './styles';

const AboutUs = ({navigation, route}) => {
  return (
    <Container
      source={backgroundLogo}
      imageStyle={{
        top: 0,
        height: '90%',
      }}>
      <Content>
        <PlanInfoBox />
        <Logo source={logo} />
        <SubTitle value="Sobre nós" size={14} mb={20} />
        <Text>
          O <TextBold>GRAZING</TextBold> é um aplicativo offline desenvolvido
          com dados de pesquisa, com equações modeladas, combinando informações
          sobre métodos de pastoreio, sistemas de produção, categorias animais,
          espécies forrageiras e informações básicas dos animais e da
          propriedade rural. {'\n'}O GRAZING orienta produtores(as) e
          consultores(as) técnicos a gerar
          <TextBold>recomendações inteligentes</TextBold> para a melhor
          <TextBold>tomada de decisões</TextBold> nas propriedades rurais quando
          o assunto for manejo de pastagens. O GRAZING visa o
          <TextBold> manejo adequado das pastagens</TextBold>, com a finalidade
          de <TextBold>aumentar a produtividade</TextBold> das propriedades
          rurais.
        </Text>
      </Content>
    </Container>
  );
};

export default AboutUs;
