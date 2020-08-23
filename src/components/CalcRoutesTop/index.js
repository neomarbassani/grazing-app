import React from 'react';
import {Container, Text} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import {colors} from '../../styles';

import {useNavigation} from '@react-navigation/core';

const CalcRoutesTop = ({items, color}) => {
  const navigation = useNavigation();
  return (
    <Container>
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
                {item}
              </Text>
            </>
          ),
      )}
    </Container>
  );
};

export default CalcRoutesTop;
