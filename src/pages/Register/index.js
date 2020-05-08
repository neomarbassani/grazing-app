import React, { useRef, useEffect, useState } from 'react';
import { Form } from '@unform/mobile';
import { Scope } from '@unform/core';
import { useDispatch, useSelector } from 'react-redux';

import * as Yup from 'yup';

import { Container } from '../../layout/Auth';
import { AddressFields } from './styles';

import Title from '../../components/Title';
import LogoHeader from '../../components/LogoHeader';
import Input from '../../components/Input';
import MaskedInput from '../../components/MaskedInput';
import InputPicker from '../../components/InputPicker';

import Link from '../../components/Link';
import Button from '../../components/Button';

import locations from '../../services/locations';

import AuthActions from '../../store/ducks/auth';

export default function Register({ navigation }) {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading);

  const formRef = useRef(null);
  const stateInputRef = useRef(null);
  const cityInputRef = useRef(null);

  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    const statesArray = locations.reduce((acc, state) => {
      return [...acc, state.nome];
    }, []);
    setStates(statesArray);
  }, []);

  useEffect(() => {
    formRef.current.setFieldValue('address.city', selectedCity);
    formRef.current.setFieldValue('address.state', selectedState);
  }, [selectedCity, selectedState]);

  const handleAvailableCities = (stateName) => {
    if (stateName) {
      const availableCities = locations.find(
        (state) => state.nome === stateName,
      ).cidades;

      setCities(availableCities);
    }
  };

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string()
          .required('Nome completo é obrigatório')
          .min(3, 'Insira seu nome')
          .max(200, 'Insira seu nome'),
        email: Yup.string()
          .email('Insira um e-mail válido.')
          .required('Um e-mail é obrigatório'),
        phone: Yup.string()
          .required('Telefone é obrigatório')
          .min(10, 'Telefone é obrigatório')
          .max(11, 'Telefone é obrigatório'),
        password: Yup.string()
          .required('Informe sua senha')
          .min(8, 'No mínimo 8 caracteres'),
        passwordConfirmation: Yup.string().oneOf(
          [Yup.ref('password'), null],
          'Senhas não conferem',
        ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log(data);

      // dispatch(AuthActions.signInRequest(userData));
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }
    }
  }

  function focusInput(field) {
    const focusInputField = formRef.current.getFieldRef(field);
    focusInputField.focus();
  }

  return (
    <Container>
      <LogoHeader />
      <Title value="Criar uma conta" size={24} mb={16} />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="name"
          label="Nome completo"
          placeholder="Seu nome completo"
          returnKeyType="next"
          onSubmitEditing={() => focusInput('email')}
        />
        <Input
          name="email"
          type="email"
          label="E-mail"
          placeholder="email@exemplo.com.br"
        />
        <MaskedInput
          name="phone"
          label="Telefone"
          type={'cel-phone'}
          placeholder="(00) 00000-0000"
        />
        <Scope path="address">
          <AddressFields>
            <InputPicker
              label="Estado"
              width={40}
              data={states}
              selectedValue={selectedState}
              onValueChange={(value) => {
                setSelectedState(value);
                handleAvailableCities(value);
              }}
            />
            <InputPicker
              label="Cidade"
              data={cities}
              width={55}
              selectedValue={selectedCity}
              onValueChange={(value) => {
                setSelectedCity(value);
              }}
            />
          </AddressFields>
        </Scope>
        <Input
          name="password"
          type="password"
          placeholder="*********"
          label="Senha"
        />
        <Input
          name="passwordConfirmation"
          type="password"
          placeholder="*********"
          label="Confirmar Senha"
        />
      </Form>

      <Link
        content="Já tenho uma conta"
        mb={24}
        mt={24}
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        content="Criar conta"
        loading={loading}
        onPress={() => formRef.current.submitForm()}
      />
    </Container>
  );
}
