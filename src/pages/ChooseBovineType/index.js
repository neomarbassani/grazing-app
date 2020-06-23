/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import Container from '../../layout/App';

import SubTitle from '../../components/SubTitle';
import ChooseItemButton from '../../components/ChooseItemButton';
import ProgressBar from '../../components/ProgressBar';
import CalcHeader from '../../components/CalcHeader';
import CalcRoutesTop from '../../components/CalcRoutesTop';

import backgroundLogo from '../../assets/backgroundLogo.png';

import bovinetype1 from '../../assets/bovinetype1.jpg';
import bovinetype2 from '../../assets/bovinetype2.jpg';

import {Content} from './styles';

const ChooseBovineType = ({navigation, route}) => {
  const {calc} = route.params;

  const items = [calc.name];

  return (
    <Container
      source={backgroundLogo}
      imageStyle={{
        top: 0,
        height: '80%',
      }}>
      <ProgressBar size={37.5} />
      <CalcHeader />
      <Content>
        <CalcRoutesTop items={items} />
        <SubTitle value="Qual é o sistema de produção?" size={14} mb={20} />
        <ChooseItemButton
          size={47}
          source={bovinetype1}
          content={'Bovinocultura\n de corte'}
          onPress={() => {
            navigation.navigate('ChooseBovineCategory', {
              calc,
              animalCategory: 'Bovinocultura de corte',
            });
          }}
        />
        <ChooseItemButton
          content={'Bovinocultura\n de leite'}
          source={bovinetype2}
          size={47}
          onPress={() => {
            navigation.navigate('ChooseBovineCategory', {
              calc,
              animalCategory: 'Bovinocultura de leite',
            });
          }}
        />
      </Content>
    </Container>
  );
};

export default ChooseBovineType;
