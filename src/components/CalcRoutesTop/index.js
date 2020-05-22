import React from 'react';
import { Container, Text } from './styles';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../styles';

const CalcRoutesTop = ({ items }) => {
  return (
    <Container>
      <Icon name="home" size={20} color="#D09776" />
      <Icon name="chevron-right" size={20} color={colors.primary} />
      {items.map((item) => (
        <>
          <Text key={item}>{item}</Text>
          <Icon
            name="chevron-right"
            size={20}
            color={colors.primary}
            key={`${item}1`}
          />
        </>
      ))}
    </Container>
  );
};

export default CalcRoutesTop;
