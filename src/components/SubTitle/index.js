import React from 'react';

import {Text} from './styles';

export default function SubTitle({value, mb, mt, size, color}) {
  return (
    <Text size={size} mt={mt} mb={mb} color={color}>
      {value}
    </Text>
  );
}
