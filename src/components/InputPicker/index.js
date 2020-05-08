import React from 'react';

import { Container, InputField } from './styles';

import Label from '../Label';

export default function InputPicker({ label, name, data, width, ...rest }) {
  return (
    <Container width={width}>
      {label && <Label>{label}</Label>}

      <InputField {...rest}>
        <InputField.Item label="Selecione" value={null} />
        {data &&
          data.map((item) => (
            <InputField.Item key={item} label={item} value={item} />
          ))}
      </InputField>
    </Container>
  );
}
