/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import Container from '../../layout/App';

import SubTitle from '../../components/SubTitle';
import ChooseItemButton from '../../components/ChooseItemButton';
import ProgressBar from '../../components/ProgressBar';
import CalcHeader from '../../components/CalcHeader';
import CalcRoutesTop from '../../components/CalcRoutesTop';

import {Content} from './styles';

import backgroundLogo from '../../assets/backgroundLogo.png';

import terneiro from '../../assets/terneiro.jpeg';
import vacaemlactacao from '../../assets/vacaemlactacao.jpg';
import vacaprenha from '../../assets/vacaprenha.jpeg';
import vacaseca from '../../assets/vacaseca.jpg';
import novilha from '../../assets/novilha.jpg';
import novilhaleiteira from '../../assets/novilhaleiteira.jpg';

const ChooseBovineCategory = ({navigation, route}) => {
  const {calc, animalCategory} = route.params;

  console.log(route.params);

  const items = [calc.name];

  return (
    <Container
      source={backgroundLogo}
      imageStyle={{
        top: 0,
        height: '80%',
      }}>
      <ProgressBar size={50} />
      <CalcHeader />
      <Content>
        <CalcRoutesTop items={items} />
        <SubTitle value="Qual é a categoria animal?" size={14} mb={20} />
        <ChooseItemButton
          size={47}
          content={'Terneiro'}
          source={terneiro}
          onPress={() => {
            navigation.navigate('AnimalInfo', {
              calc,
              animal: {
                name: animalCategory,
                value: 'Terneito',
              },
            });
          }}
        />
        <ChooseItemButton
          content={'Vaca em lactação'}
          size={47}
          source={vacaemlactacao}
          onPress={() => {
            navigation.navigate('AnimalInfo', {
              calc,
              animal: {
                name: animalCategory,
                value: 'Vaca em lactação',
              },
            });
          }}
        />
        <ChooseItemButton
          content={'Vaca seca'}
          size={47}
          source={vacaseca}
          onPress={() => {
            navigation.navigate('AnimalInfo', {
              calc,
              animal: {
                name: animalCategory,
                value: 'Vaca seca',
              },
            });
          }}
        />
        <ChooseItemButton
          content={'Vaca prenha'}
          size={47}
          source={vacaprenha}
          onPress={() => {
            navigation.navigate('AnimalInfo', {
              calc,
              animal: {
                name: animalCategory,
                value: 'Vaca prenha',
              },
            });
          }}
        />
        <ChooseItemButton
          content={'Novilha'}
          source={novilha}
          size={47}
          onPress={() => {
            navigation.navigate('AnimalInfo', {
              calc,
              animal: {
                name: animalCategory,
                value: 'Novilha',
              },
            });
          }}
        />
        <ChooseItemButton
          content={'Novilha Leiteira '}
          source={novilhaleiteira}
          size={47}
          onPress={() => {
            navigation.navigate('AnimalInfo', {
              calc,
              animal: {
                name: animalCategory,
                value: 'Novilha Leiteira',
              },
            });
          }}
        />
      </Content>
    </Container>
  );
};

export default ChooseBovineCategory;
