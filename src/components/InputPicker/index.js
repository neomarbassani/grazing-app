import React from 'react';

import {
  Container,
  Content,
  InputField,
  InputFieldItem,
  IconPicker,
  Label,
} from './styles';

export default function InputPicker({label, name, data, width, ...rest}) {
  return (
    <Container width={width}>
      {label && <Label>{label}</Label>}
      <Content>
        <InputField {...rest}>
          <InputFieldItem label="Selecione" value={null} />
          {data &&
            data.map(item => (
              <InputFieldItem key={item} label={item} value={item} />
            ))}
        </InputField>
        <IconPicker name="chevron-down" size={24} color="#888899" />
      </Content>
    </Container>
  );
}
