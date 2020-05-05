import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  InputField,
  ToogleVisility,
  Content,
  InputError,
} from './styles';

import Label from '../Label';

export default function Input({ label, type, name, next, ...rest }) {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const inputRef = useRef(null);

  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    type === 'password' ? setPasswordVisibility(true) : null;
  }, [type]);

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
          type={type}
          secureTextEntry={passwordVisibility}
          placeholderTextColor="#c4c4c4"
          autoCapitalize={
            type === 'email' || type === 'password' ? 'none' : 'words'
          }
          onChangeText={(value) => {
            if (inputRef.current) {
              inputRef.current.value = value;
            }
          }}
          {...rest}
        />
        {type === 'password' && (
          <ToogleVisility
            onPress={() => setPasswordVisibility(!passwordVisibility)}>
            {passwordVisibility ? (
              <Icon name="eye-off" size={16} color="#888899" />
            ) : (
              <Icon name="eye" size={16} color="#888899" />
            )}
          </ToogleVisility>
        )}
      </Content>
      {error && <InputError>{error}</InputError>}
    </Container>
  );
}
