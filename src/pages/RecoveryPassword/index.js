import React, { useRef } from 'react';
import { Form } from '@unform/mobile';

import * as Yup from 'yup';

import { Container, ContentBottom, ContentTop } from '../../layout/Auth';

import Title from '../../components/Title';
import LogoHeader from '../../components/LogoHeader';
import Input from '../../components/Input';
import Link from '../../components/Link';
import Button from '../../components/Button';

export default function SignIn({ navigation }) {
  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Insira um e-mail válido.')
          .required('Um e-mail é obrigatório'),
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

    navigation.navigate('NewPassword');
  }

  return (
    <Container>
      <ContentTop>
        <LogoHeader />
        <Title value="Recuperar Senha" size={24} mb={16} />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="email"
            type="email"
            label="E-mail"
            placeholder="email@exemplo.com.br"
          />
        </Form>
      </ContentTop>

      <ContentBottom>
        <Link
          content="Voltar para Login"
          mb={24}
          onPress={() => navigation.navigate('Login')}
        />
        <Button
          content="Recuperar Senha"
          onPress={() => formRef.current.submitForm()}
        />
      </ContentBottom>
    </Container>
  );
}
