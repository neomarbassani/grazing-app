import React from 'react';

import {
  Container,
  Content,
  InputField,
  InputFieldItem,
  IconPicker,
  Label,
} from './styles';
import {StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default function InputPicker({label, name, data, width, ...rest}) {
  const placeholder = {
    label: 'Selecione...',
    value: null,
    color: '#888899',
  };
  return (
    <Container width={width}>
      {label && <Label>{label}</Label>}
      <RNPickerSelect
        useNativeAndroidPickerStyle={false}
        style={{
          ...pickerSelectStyles,
        }}
        placeholder={placeholder}
        items={data}
        {...rest}
      />
    </Container>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 5,
    color: '#888899',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: '#d9d9d9',
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#888899',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
