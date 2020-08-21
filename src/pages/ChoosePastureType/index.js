/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import Container from '../../layout/App';

import SubTitle from '../../components/SubTitle';
import ChooseItemButton from '../../components/ChooseItemButton';
import ProgressBar from '../../components/ProgressBar';
import CalcHeader from '../../components/CalcHeader';
import CalcRoutesTop from '../../components/CalcRoutesTop';
import backgroundLogo from '../../assets/backgroundLogo.png';

import aveia from '../../assets/aveiaLista.jpg';
import azevem from '../../assets/azevemLista.jpg';
import campoNativo from '../../assets/campoNativoLista.jpg';
import campoNativoMelhorado from '../../assets/campoNativoMelhoradoLista.jpg';
import milheto from '../../assets/milhetoLista.jpg';
import papua from '../../assets/papuaLista.jpeg';
import sorgo from '../../assets/sorgoLista.jpg';
import sudao from '../../assets/sudaoLista.jpg';
import tifton from '../../assets/tiftonFundo.jpg';

import {Content, ScrollView} from './styles';

const ChoosePastureType = ({navigation, route}) => {
  const {animal, calc, inputs} = route.params;

  const items = [
    calc.value,
    calc.name,
    animal && animal.name,
    animal && animal.value,
  ];

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
            content="Aveia"
            source={aveia}
            onPress={() => {
              navigation.navigate('Form', {
                animal,
                calc,
                inputs,
                pasture: {
                  name: 'Qual espécie forrageira?',
                  value: 'Aveia',
                  key: 'aveia',
                },
              });
            }}
          />
          <ChooseItemButton
            size={100}
            content="Aveia + Azevém"
            source={azevem}
            onPress={() => {
              navigation.navigate('Form', {
                animal,
                calc,
                inputs,
                pasture: {
                  name: 'Qual espécie forrageira?',
                  value: 'Aveia + Azevém',
                  key: 'aveiaAzevem',
                },
              });
            }}
          />
          <ChooseItemButton
            size={100}
            content="Azevém"
            source={azevem}
            onPress={() => {
              navigation.navigate('Form', {
                animal,
                calc,
                inputs,
                pasture: {
                  name: 'Qual espécie forrageira?',
                  value: 'Azevém',
                  key: 'azevem',
                },
              });
            }}
          />
          <ChooseItemButton
            size={100}
            content="Campo Nativo"
            source={campoNativo}
            onPress={() => {
              navigation.navigate('Form', {
                animal,
                calc,
                inputs,
                pasture: {
                  name: 'Qual espécie forrageira?',
                  value: 'Campo Nativo',
                  key: 'campoNativo',
                },
              });
            }}
          />
          <ChooseItemButton
            size={100}
            content="Campo Nativo Melhorado"
            source={campoNativoMelhorado}
            onPress={() => {
              navigation.navigate('Form', {
                animal,
                calc,
                inputs,
                pasture: {
                  name: 'Qual espécie forrageira?',
                  value: 'Campo Nativo Melhorado',
                  key: 'campoNativoMelhorado',
                },
              });
            }}
          />
          <ChooseItemButton
            size={100}
            content="Capim-Sudão"
            source={sudao}
            onPress={() => {
              navigation.navigate('Form', {
                animal,
                calc,
                inputs,
                pasture: {
                  name: 'Qual espécie forrageira?',
                  value: 'Capim-Sudão',
                  key: 'sudao',
                },
              });
            }}
          />
          <ChooseItemButton
            size={100}
            content="Milheto"
            source={milheto}
            onPress={() => {
              navigation.navigate('Form', {
                animal,
                calc,
                inputs,
                pasture: {
                  name: 'Qual espécie forrageira?',
                  value: 'Milheto',
                  key: 'milheto',
                },
              });
            }}
          />
          <ChooseItemButton
            size={100}
            content="Papuã"
            source={papua}
            onPress={() => {
              navigation.navigate('Form', {
                animal,
                calc,
                inputs,
                pasture: {
                  name: 'Qual espécie forrageira?',
                  value: 'Papuã',
                  key: 'papua',
                },
              });
            }}
          />
          <ChooseItemButton
            size={100}
            content="Sorgo"
            source={sorgo}
            onPress={() => {
              navigation.navigate('Form', {
                animal,
                calc,
                inputs,
                pasture: {
                  name: 'Qual espécie forrageira?',
                  value: 'Sorgo',
                  key: 'sorgo',
                },
              });
            }}
          />
          <ChooseItemButton
            size={100}
            content="Tifton"
            source={tifton}
            onPress={() => {
              navigation.navigate('Form', {
                animal,
                calc,
                inputs,
                pasture: {
                  name: 'Qual espécie forrageira?',
                  value: 'Tifton',
                  key: 'tifton',
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
