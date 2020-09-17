import React, {useEffect, useRef, useState} from 'react';
import Modal from 'react-native-modal';
import {ModalContainer, ButtonClose, Title} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import Button from '../Button';
import Input from '../Input';
import * as Yup from 'yup';
import {Form} from '@unform/mobile';

const ModalInput = ({children, name, value, minValue, maxValue, onChange}) => {
  const [isVisible, setIsVisible] = useState(false);

  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        value: Yup.number()
          .min(parseFloat(minValue), `Valor mínimo ${minValue}`)
          .max(parseFloat(maxValue), `Valor máximo ${maxValue}`)
          .required('Insira um valor.'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      onChange(data.value);
      setIsVisible(false);
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }
    }
  }

  useEffect(() => {
    if (isVisible) {
      if (formRef && formRef.current) {
        formRef.current.setData({
          value: parseFloat(value)
            .toFixed(2)
            .toString(),
        });
        const focusInputField = formRef.current.getFieldRef('value');
        focusInputField.getElement().focus();
      }
    }
  }, [isVisible, value]);

  return (
    <ButtonClose onPress={() => setIsVisible(true)}>
      <Modal isVisible={isVisible}>
        <ButtonClose>
          <Icon
            name="x"
            size={25}
            onPress={() => setIsVisible(false)}
            style={{color: '#fff'}}
          />
        </ButtonClose>
        <ModalContainer>
          <Title>{name}</Title>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="value"
              maskMoney
              keyboardType="numeric"
              returnKeyType="next"
              blurOnSubmit={false}
            />
            <Button
              content="Finalizar"
              color="#D69D2B"
              onPress={() => formRef.current.submitForm()}
            />
          </Form>
        </ModalContainer>
      </Modal>
      {children}
    </ButtonClose>
  );
};

export default ModalInput;
