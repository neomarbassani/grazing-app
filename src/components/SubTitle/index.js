import React from 'react';

import {Text} from './styles';

export default function SubTitle({value, mb, mt, size}) {
  return (
    <Text size={size} mt={mt} mb={mb}>
      {value}
    </Text>
  );
}
