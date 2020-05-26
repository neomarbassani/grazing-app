import React, {useState, useRef, useEffect} from 'react';
import {useField} from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  InputField,
  ToogleVisility,
  Content,
  InputError,
  InputFieldMask,
} from './styles';

import Label from '../Label';

export default function Input({label, type, name, next, maskType, ...rest}) {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const inputRef = useRef(null);

  const {fieldName, registerField, defaultValue, error} = useField(name);

  const [mask, setMask] = useState('');

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
        ref.setNativeProps({text: value});
        inputRef.current.value = value;
      },
      getValue(ref) {
        if (maskType) {
          return ref.getRawValue();
        } else {
          return ref.value || '';
        }
      },
    });
  }, [fieldName, mask, maskType, registerField]);

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <Content>
        {maskType ? (
          <InputFieldMask
            ref={inputRef}
            defaultValue={defaultValue}
            placeholderTextColor="#888899"
            includeRawValueInChangeText={true}
            type={maskType}
            value={mask}
            onChangeText={e => {
              setMask(e);
            }}
            {...rest}
          />
        ) : (
          <>
            <InputField
              ref={inputRef}
              defaultValue={defaultValue}
              type={type === 'email' ? 'email-address' : null}
              secureTextEntry={passwordVisibility}
              placeholderTextColor="#888899"
              autoCapitalize={
                type === 'email' || type === 'password' ? 'none' : 'words'
              }
              onChangeText={value => {
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
          </>
        )}
      </Content>
      {error && <InputError>{error}</InputError>}
    </Container>
  );
}
