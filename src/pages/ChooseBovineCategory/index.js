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
          content={'Vaca'}
          size={47}
          onPress={() => {
            navigation.navigate('AnimalInfo', {
              calc,
              animal: {
                name: animalCategory,
                value: 'Vaca',
              },
            });
          }}
        />
        <ChooseItemButton
          content={'Novilha'}
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
      </Content>
    </Container>
  );
};

export default ChooseBovineCategory;
