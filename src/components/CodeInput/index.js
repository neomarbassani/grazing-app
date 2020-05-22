import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';

import { NumberInput } from './styles';

const Input = ({ name, ...rest }) => {
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
    <NumberInput
      maxLength={1}
      textAlign="center"
      keyboardType="phone-pad"
      ref={inputRef}
      defaultValue={defaultValue}
      placeholderTextColor="#c4c4c4"
      onChangeText={(value) => {
        if (inputRef.current) {
          inputRef.current.value = value;
        }
      }}
      {...rest}
    />
  );
};

export default Input;
