import React from 'react';

import { BoxTitle, Text } from './styles';

export default function Title({ value, mb, mt, size }) {
  return (
    <BoxTitle mt={mt} mb={mb}>
      <Text size={size}>{value}</Text>
    </BoxTitle>
  );
}
