/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import Container from '../../layout/App';

import SubTitle from '../../components/SubTitle';
import ChooseItemButton from '../../components/ChooseItemButton';
import ProgressBar from '../../components/ProgressBar';
import CalcHeader from '../../components/CalcHeader';
import CalcRoutesTop from '../../components/CalcRoutesTop';
import backgroundLogo from '../../assets/backgroundLogo.png';

import {Content, ScrollView} from './styles';

const ChoosePastureType = ({navigation, route}) => {
  const {animal, calc, inputs} = route.params;

  const items = [calc.name];

  return (
    <Container
      source={backgroundLogo}
      imageStyle={{
        top: 0,
        height: '80%',
      }}>
      <ProgressBar size={75} />
      <CalcHeader />
      <Content>
        <CalcRoutesTop items={items} />
        <SubTitle value="Qual espécie forrageira?" size={14} mb={20} />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <ChooseItemButton
            size={100}
            content="Azevém"
            onPress={() => {
              navigation.navigate('DimensionArea', {
                animal,
                calc,
                inputs,
                pasture: {
                  name: 'Qual espécie forrageira?',
                  value: 'Azevém',
                },
              });
            }}
          />
          <ChooseItemButton
            size={100}
            content="Campo Nativo"
            onPress={() => {
              navigation.navigate('DimensionArea', {
                animal,
                calc,
                inputs,
                pasture: {
                  name: 'Qual espécie forrageira?',
                  value: 'Campo Nativo',
                },
              });
            }}
          />
          <ChooseItemButton
            size={100}
            content="Azevém"
            onPress={() => {
              navigation.navigate('DimensionArea', {
                animal,
                calc,
                inputs,
                pasture: {
                  name: 'Qual espécie forrageira?',
                  value: 'Azevém',
                },
              });
            }}
          />
          <ChooseItemButton
            size={100}
            content="Milheto"
            onPress={() => {
              navigation.navigate('DimensionArea', {
                animal,
                calc,
                inputs,
                pasture: {
                  name: 'Qual espécie forrageira?',
                  value: 'Milheto',
                },
              });
            }}
          />
          <ChooseItemButton
            size={100}
            content="Sudão"
            onPress={() => {
              navigation.navigate('DimensionArea', {
                animal,
                calc,
                inputs,
                pasture: {
                  name: 'Qual espécie forrageira?',
                  value: 'Sudão',
                },
              });
            }}
          />
          <ChooseItemButton
            size={100}
            content="Azevém"
            onPress={() => {
              navigation.navigate('DimensionArea', {
                animal,
                calc,
                inputs,
                pasture: {
                  name: 'Qual espécie forrageira?',
                  value: 'Azevém',
                },
              });
            }}
          />
        </ScrollView>
      </Content>
    </Container>
  );
};

export default ChoosePastureType;
