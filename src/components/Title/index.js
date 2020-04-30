import React from 'react';

import { BoxTitle, Text } from './styles';

export default function Title({ value, ml, mt, size, children }) {
  return (
    <BoxTitle mt={mt}>
      <Text ml={ml} size={size}>
        {value}
      </Text>
      {children}
    </BoxTitle>
  );
}
