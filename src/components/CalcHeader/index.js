import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import {useNavigation} from '@react-navigation/native';

import {Container} from './styles';

const CalcHeader = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Icon
        name="arrow-left"
        size={25}
        color="#888899"
        onPress={() => navigation.goBack()}
      />
      <Icon
        name="x-circle"
        size={25}
        color="#888899"
        onPress={() => navigation.navigate('Home')}
      />
    </Container>
  );
};

export default CalcHeader;
