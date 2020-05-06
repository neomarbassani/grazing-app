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

        password: Yup.string().required('Informe sua senha'),
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
      <ContentTop>
        <LogoHeader />
        <Title value="Login" size={24} mb={16} />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="email"
            type="email"
            label="E-mail"
            placeholder="email@exemplo.com.br"
            returnKeyType="next"
            onSubmitEditing={() => focusInput('password')}
          />
          <Input
            name="password"
            type="password"
            placeholder="*********"
            label="Senha"
          />
        </Form>
        <Link
          content="Esqueci minha senha"
          onPress={() => navigation.navigate('RecoveryPassword')}
          color="#D69D2B"
          mt={5}
        />
      </ContentTop>

      <ContentBottom>
        <Link
          content="Criar uma conta"
          mb={24}
          onPress={() => navigation.navigate('Register')}
        />
        <Button content="Login" onPress={() => formRef.current.submitForm()} />
      </ContentBottom>
    </Container>
  );
}
