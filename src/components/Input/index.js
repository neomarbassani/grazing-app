import React, {useState, useRef, useEffect} from 'react';
import {useField} from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import {
  Container,
  InputField,
  ToogleVisility,
  InputFieldMask,
  Content,
  InputError,
  InputFieldDate,
  Label,
} from './styles';

export default function Input({
  label,
  type,
  name,
  next,
  mb,
  maskType,
  maskPhone,
  maskMoney,
  precision,
  typeIcon,
  textarea,
  color,
  children,
  ...rest
}) {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const inputRef = useRef(null);

  const {fieldName, registerField, defaultValue, error} = useField(name);

  const [date, setDate] = useState(null);
  const [mask, setMask] = useState(defaultValue);

  const [show, setShow] = useState(false);

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
        if (!maskMoney) {
          ref.setNativeProps({text: value});
          inputRef.current.value = value;
        } else {
          setMask(value);
        }
      },
      getValue(ref) {
        if (maskPhone) {
          return ref.getRawValue() || '';
        }
        return ref.value || '';
      },
    });
  }, [fieldName, mask, maskMoney, maskPhone, registerField]);

  return (
    <>
      <Container textarea={textarea} mb={mb}>
        {label && <Label color={color}>{label}</Label>}
        <Content textarea={textarea}>
          {maskType ? (
            <>
              <InputFieldDate
                ref={inputRef}
                placeholderTextColor="#888899"
                editable={false}
                pointerEvents="none"
                value={date ? moment(date).format('DD-MM-YYYY') : null}
              />
              {typeIcon === 'datetimepicker' && (
                <ToogleVisility onPress={() => setShow(true)}>
                  <Icon name="calendar" size={16} color="#888899" />
                </ToogleVisility>
              )}
            </>
          ) : maskPhone || maskMoney ? (
            <>
              {maskPhone && (
                <InputFieldMask
                  ref={inputRef}
                  defaultValue={defaultValue}
                  value={mask}
                  keyboardType="numeric"
                  type={'cel-phone'}
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) ',
                  }}
                  onChangeText={value => {
                    setMask(value);
                    if (inputRef.current) {
                      inputRef.current.value = value;
                    }
                  }}
                  {...rest}
                />
              )}
              {maskMoney && (
                <InputFieldMask
                  ref={inputRef}
                  defaultValue={defaultValue}
                  value={mask}
                  keyboardType="numeric"
                  type={'money'}
                  options={{
                    precision: precision || 0,
                    separator: '.',
                    delimiter: '.',
                    unit: '',
                    suffixUnit: '',
                  }}
                  onChangeText={value => {
                    setMask(value);
                    if (inputRef.current) {
                      inputRef.current.value = value;
                    }
                  }}
                  {...rest}
                />
              )}
            </>
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
              {children && children}
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

          {show && (
            <DateTimePicker
              value={date || new Date()}
              display="calendar"
              onChange={(event, selectedDate) => {
                setShow(false);

                const currentDate = selectedDate;
                console.log(currentDate);
                setDate(currentDate);
                if (inputRef.current) {
                  inputRef.current.value = currentDate;
                }
              }}
            />
          )}
        </Content>
        {error && <InputError>{error}</InputError>}
      </Container>
    </>
  );
}
