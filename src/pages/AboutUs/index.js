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
        {/* <PlanInfoBox /> */}
        <Logo source={logo} />
        <SubTitle value="Sobre nós" size={14} mb={20} />
        <Text>
          O <TextBold>GRAZING</TextBold> é um aplicativo offline desenvolvido
          com dados de pesquisa e modelos matemáticos que combinam informações
          sobre métodos de pastoreio, sistemas de produção, categorias animais,
          espécies forrageiras e informações básicas dos animais, da pastagem e
          da propriedade rural. O <TextBold>GRAZING</TextBold> orienta
          produtores(as) e consultores(as) técnicos(as) na tomada de decisão
          inteligente, pela recomendação do manejo mais adequado das pastagens
          da propriedade rural. As soluções disponibilizadas no aplicativo
          orientam quanto ao dimensionamento da área de pastagem, definição do
          número de piquetes, ajuste da lotação animal, determinação do período
          de ocupação nos piquetes e necessidade de fornecimento de suplemento
          aos animais. O<TextBold>GRAZING</TextBold> visa o manejo adequado das
          pastagens, com a finalidade de aumentar a produtividade das
          propriedades rurais.
        </Text>
      </Content>
    </Container>
  );
};

export default AboutUs;
