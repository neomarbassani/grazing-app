import React from 'react';
import {Container, Text} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import {colors} from '../../styles';

const CalcRoutesTop = ({items, color}) => {
  return (
    <Container>
      <Icon name="home" size={20} color="#D09776" />
      <Icon
        name="chevron-right"
        size={20}
        color={color ? color : colors.primary}
      />
      {items.map(item => (
        <>
          <Text key={item} color={color}>
            {item}
          </Text>
          <Icon
            name="chevron-right"
            size={20}
            color={color ? color : colors.primary}
            key={`${item}1`}
          />
        </>
      ))}
    </Container>
  );
};

export default CalcRoutesTop;
