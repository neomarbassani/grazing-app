import React from 'react';
import Icon from 'react-native-vector-icons/Fontisto';

import {Container} from './styles';

export default function Link({navigation, content, mt, mb, color, ...rest}) {
  return (
    <Container color={color} mt={mt} mb={mb} {...rest}>
      {content} {''}
      <Icon name="angle-right" size={12} color={color ? color : '#C94324'} />
    </Container>
  );
}
