import React, {useRef, useEffect, useState} from 'react';
import {Form} from '@unform/mobile';
import {Scope} from '@unform/core';
import {useDispatch, useSelector} from 'react-redux';

import * as Yup from 'yup';

import Container from '../../layout/Auth';
import {Logo, FormArea} from './styles';

import Title from '../../components/Title';
import Input from '../../components/Input';
import InputPicker from '../../components/InputPicker';
import Link from '../../components/Link';
import Button from '../../components/Button';

import logo from '../../assets/logoHorizontal.png';

import locations from '../../services/locations';

import AuthActions from '../../store/ducks/auth';

export default function Register({navigation}) {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);

  const formRef = useRef(null);

  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    const statesArray = locations.reduce((acc, state) => {
      return [...acc, state.sigla];
    }, []);
    setStates(statesArray);
  }, []);

  const handleAvailableCities = stateName => {
    if (stateName) {
      const availableCities = locations.find(state => state.sigla === stateName)
        .cidades;

      setCities(availableCities);
    }
  };

  async function handleSubmit(userData) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string()
          .required('Nome completo é obrigatório')
          .min(5, 'Insira seu nome'),
        email: Yup.string()
          .email('Insira um e-mail válido.')
          .required('Um e-mail é obrigatório'),
        property_size: Yup.string().required(
          'Tamanho da propriedade é obrigatório',
        ),
        phone: Yup.string()
          .required('Telefone é obrigatório')
          .min(10, 'Telefone é obrigatório')
          .max(11, 'Telefone é obrigatório'),
        password: Yup.string()
          .required('Informe sua senha')
          .min(6, 'No mínimo 6 caracteres'),
        passwordConfirmation: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Senhas não conferem')
          .required('Confirme sua senha'),
      });

      await schema.validate(userData, {
        abortEarly: false,
      });

      delete userData.passwordConfirmation;

      userData.address = {
        state: selectedState,
        city: selectedCity,
      };

      dispatch(AuthActions.signUpRequest(userData));
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

  function focusInput(field) {
    const focusInputField = formRef.current.getFieldRef(field);

    if (typeof focusInputField.focus === 'function') {
      focusInputField.focus();
    } else {
      focusInputField.getElement().focus();
    }
  }

  return (
    <Container>
      <Logo source={logo} />
      <Title value="Criar uma nova conta" size={16} mb={16} />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <FormArea>
          <Input
            name="name"
            label="Nome completo"
            placeholder="Seu nome completo"
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => focusInput('email')}
          />
          <Input
            name="email"
            type="email"
            label="E-mail"
            blurOnSubmit={false}
            returnKeyType="next"
            placeholder="email@exemplo.com.br"
            onSubmitEditing={() => focusInput('phone')}
          />
          <Input
            name="phone"
            label="Telefone"
            maskType={'cel-phone'}
            placeholder="(00) 00000-0000"
            blurOnSubmit={false}
            returnKeyType="next"
            onSubmitEditing={() => focusInput('property_size')}
          />
          <Input
            name="property_size"
            label="Tamanho da propriedade (hectares)"
            placeholder="25 hectares"
            returnKeyType="next"
            blurOnSubmit={true}
          />
          <Scope path="address">
            <InputPicker
              label="Estado"
              data={states}
              width={40}
              prompt="Escolha um estado"
              selectedValue={selectedState}
              onValueChange={value => {
                setSelectedState(value);
                handleAvailableCities(value);
              }}
            />
            <InputPicker
              label="Cidade"
              data={cities}
              width={55}
              prompt="Escolha uma cidade"
              selectedValue={selectedCity}
              onValueChange={value => {
                setSelectedCity(value);
              }}
            />
          </Scope>
          <Input
            name="password"
            type="password"
            placeholder="*********"
            label="Senha"
            blurOnSubmit={false}
            returnKeyType="next"
            onSubmitEditing={() => focusInput('passwordConfirmation')}
          />
          <Input
            name="passwordConfirmation"
            type="password"
            placeholder="*********"
            label="Confirmar Senha"
          />
        </FormArea>
      </Form>

      <Link
        content="Já tenho uma conta"
        mb={24}
        mt={20}
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        content="Criar conta"
        loading={loading}
        onPress={() => formRef.current.submitForm()}
        mb={16}
      />
    </Container>
  );
}
