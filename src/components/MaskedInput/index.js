import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@unform/core';

import { Container, InputField, Content, InputError } from './styles';

import Label from '../Label';

export default function MaskedInput({ label, name, next, ...rest }) {
  const inputRef = useRef(null);
  const [phone, setPhone] = useState('');
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
      <Content>
        <InputField
          ref={inputRef}
          defaultValue={defaultValue}
          placeholderTextColor="#c4c4c4"
          includeRawValueInChangeText={true}
          value={phone}
          onChangeText={(maskedValue, value) => {
            setPhone(maskedValue);
            if (inputRef.current) {
              inputRef.current.value = value;
            }
          }}
          {...rest}
        />
      </Content>
      {error && <InputError>{error}</InputError>}
    </Container>
  );
}
