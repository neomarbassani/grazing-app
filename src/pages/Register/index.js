import React, { useRef } from 'react';
import { Form } from '@unform/mobile';
import { Scope } from '@unform/core';

import * as Yup from 'yup';

import { Container } from '../../layout/Auth';
import { AddressFields } from './styles';

import Title from '../../components/Title';
import LogoHeader from '../../components/LogoHeader';
import Input from '../../components/Input';
import MaskedInput from '../../components/MaskedInput';
import SelectInput from '../../components/SelectInput';

import Link from '../../components/Link';
import Button from '../../components/Button';

export default function SignIn({ navigation }) {
  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome completo é obrigatório'),
        email: Yup.string()
          .email('Insira um e-mail válido.')
          .required('Um e-mail é obrigatório'),
        phone: Yup.string().required('Telefone é obrigatório'),
        password: Yup.string().required('Informe sua senha'),
        passwordConfirmation: Yup.string().oneOf(
          [Yup.ref('password'), null],
          'Senhas não conferem',
        ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      navigation.navigate('PhoneConfirmation');
      console.log(data);
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);

        console.log(err.inner);
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
          returnKeyType="next"
          onSubmitEditing={() => focusInput('phone')}
        />
        <MaskedInput
          name="phone"
          label="Telefone"
          type={'cel-phone'}
          placeholder="(00) 00000-0000"
          returnKeyType="next"
          onSubmitEditing={() => focusInput('password')}
        />
        <Scope>
          <AddressFields>
            <SelectInput />
            <SelectInput />
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
        onPress={() => formRef.current.submitForm()}
      />
    </Container>
  );
}
