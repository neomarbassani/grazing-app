import React from 'react';

import {
  Container,
  InputPicker,
  InputPickerIcon,
  InputFieldItem,
} from './styles';

const HistoricFilter = ({ ...rest }) => {
  return (
    <Container>
      <InputPicker {...rest}>
        <InputFieldItem label="Filtrar por data" value={null} />
      </InputPicker>
      <InputPickerIcon name="chevron-down" size={24} color="#d69d2b" />
    </Container>
  );
};

export default HistoricFilter;
