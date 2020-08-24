/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Container, Text} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import {colors} from '../../styles';

import {useNavigation} from '@react-navigation/core';

import {View} from 'react-native';

const CalcRoutesTop = ({items, color}) => {
  const navigation = useNavigation();

  const animalType = {
    type: {
      terneiro: 'Terneiro(a)',
      novilha: 'Novilho(a)',
      novilhaLeite: 'Novilha',
      vacaSeca: 'Vaca Seca',
      vacaPrenha: 'Vaca Prenha',
      vacaLactacao: 'Vaca em lactação',
    },
    category: {
      bovinoCorte: 'Bovinocultura de Corte',
      bovinoLeite: 'Bovinocultura de leite',
    },
  };

  const pastureType = {
    campoNativo: 'Campo Nativo',
    azevem: 'Azevém',
    aveiaAzevem: 'Aveia e Azevém',
    sudao: 'Campim-Sudão',
    milheto: 'Milheto',
    sorgo: 'Sorgo',
    tifton: 'TifTon',
    papua: 'Papuã',
    campoNativoMelhorado: 'Campo Nativo Melhorado',
    aveia: 'Aveia',
  };

  function getName(key) {
    const name =
      animalType.category[key] || animalType.type[key] || pastureType[key];
    if (name) {
      return name;
    }
    return key;
  }

  return (
    <View
      style={{
        height: 50,
        width: '100%',
      }}>
      <Container
        style={{flex: 1}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        <Icon
          name="home"
          size={20}
          color="#D09776"
          onPress={() => navigation.navigate('Home')}
        />

        {items.map(
          item =>
            item && (
              <>
                <Icon
                  name="chevron-right"
                  size={20}
                  color={color ? color : colors.primary}
                  key={`${item}1`}
                />
                <Text key={item} color={color}>
                  {getName(item)}
                </Text>
              </>
            ),
        )}
      </Container>
    </View>
  );
};

export default CalcRoutesTop;
