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
  Label,
} from './styles';

export default function Input({
  label,
  type,
  name,
  next,
  mb,
  maskType,
  textarea,
  color,
  ...rest
}) {
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
    <Container textarea={textarea} mb={mb}>
      {label && <Label color={color}>{label}</Label>}
      <Content textarea={textarea}>
        {maskType ? (
          <InputFieldMask
            ref={inputRef}
            defaultValue={defaultValue}
            placeholderTextColor="#888899"
            includeRawValueInChangeText={true}
            type={maskType}
            value={mask}
            onChangeText={value => {
              setMask(value);
              if (inputRef.current) {
                inputRef.current.value = value;
              }
            }}
            {...rest}
          />
        ) : (
          <>
            <InputField
              ref={inputRef}
              defaultValue={defaultValue}
              textarea={textarea}
              multiline={textarea}
              numberOfLines={50}
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
