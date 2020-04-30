import React, { useRef } from 'react';
import { Form } from '@unform/mobile';
import { Button } from 'react-native';
import * as Yup from 'yup';

import Title from '../../components/Title';
import LogoHeader from '../../components/LogoHeader';
import Input from '../../components/Input';

import { Container } from './styles';

export default function SignIn() {
  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Insira um e-mail válido.')
          .required('Um e-mail é obrigatório'),

        password: Yup.string().required('Informe sua senha'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

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

  return (
    <Container>
      <LogoHeader />
      <Title value="Login" size={24} />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="email" type="email" label="E-mail" />
        <Input name="password" type="password" label="Senha" />
        <Button title="Sign in" onPress={() => formRef.current.submitForm()} />
      </Form>
    </Container>
  );
}
