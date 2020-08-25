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
  typeIcon,
  textarea,
  color,
  children,
  ...rest
}) {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const inputRef = useRef(null);

  const {fieldName, registerField, defaultValue, error} = useField(name);

  const [date, setDate] = useState(new Date());
  const [mask, setMask] = useState('');

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
        ref.setNativeProps({text: value});
        inputRef.current.value = value;
      },
      getValue(ref) {
        if (maskPhone) {
          return ref.getRawValue() || '';
        }
        return ref.value || '';
      },
    });
  }, [fieldName, mask, maskPhone, registerField]);

  return (
    <>
      <Container textarea={textarea} mb={mb}>
        {label && <Label color={color}>{label}</Label>}
        <Content textarea={textarea}>
          {maskType ? (
            <>
              <InputFieldDate
                ref={inputRef}
                defaultValue={defaultValue}
                placeholderTextColor="#888899"
                editable={false}
                pointerEvents="none"
                onTouchStart={() => {
                  setShow(true);
                }}
                value={moment(date).format('DD-MM-YYYY')}
                {...rest}
              />
              {typeIcon === 'datetimepicker' && (
                <ToogleVisility onPress={() => setShow(true)}>
                  <Icon name="calendar" size={16} color="#888899" />
                </ToogleVisility>
              )}
            </>
          ) : maskPhone ? (
            <InputFieldMask
              ref={inputRef}
              defaultValue={defaultValue}
              value={defaultValue}
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
              value={date}
              display="calendar"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || date;
                setDate(currentDate);
                if (inputRef.current) {
                  inputRef.current.value = currentDate;
                }
                setShow(false);
              }}
            />
          )}
        </Content>
        {error && <InputError>{error}</InputError>}
      </Container>
    </>
  );
}
