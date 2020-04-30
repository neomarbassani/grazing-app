import React from 'react';

import PropTypes from 'prop-types';

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

Title.propTypes = {
  value: PropTypes.string,
  children: PropTypes.node,
  ml: PropTypes.number,
  mt: PropTypes.number,
  size: PropTypes.number,
};

Title.defaultProps = {
  value: null,
  children: null,
  ml: 0,
  mt: 0,
  size: 0,
};
