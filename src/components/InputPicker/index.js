import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@unform/core';

import { Container, InputField, InputError } from './styles';

import Label from '../Label';

export default function InputPicker({ label, name, data, ...rest }) {
  const [selectedValue, setSelectedValue] = useState({});
  const inputRef = useRef(null);

  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,

      ref: inputRef.current,

      path: 'value',

      clearValue(ref) {
        ref.value = '';

        ref.clear();
      },

      setValue(ref, value) {
        ref.setNativeProps({ text: value });

        inputRef.current.value = value;
      },

      getValue(ref) {
        return ref.value;
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      {label && <Label>{label}</Label>}

      <InputField
        ref={inputRef}
        defaultValue={defaultValue}
        selectedValue={selectedValue}
        onValueChange={(value) => {
          setSelectedValue(value);
          if (inputRef.current) {
            inputRef.current.value = value;
          }
        }}
        {...rest}>
        <InputField.Item label="Selecione" value={null} />
        {data &&
          data.map((item) => (
            <InputField.Item key={item} label={item} value={item} />
          ))}
      </InputField>

      {error && <InputError>{error}</InputError>}
    </Container>
  );
}
