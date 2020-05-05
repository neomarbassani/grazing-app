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
        password: Yup.string().required('Uma senha é obrigatório'),

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
    navigation.navigate('Login');
  }

  function focusInput(field) {
    const focusInputField = formRef.current.getFieldRef(field);
    focusInputField.focus();
  }

  return (
    <Container>
      <ContentTop>
        <LogoHeader />
        <Title value="Nova senha" size={24} mb={16} />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="password"
            type="password"
            placeholder="*********"
            label="Nova senha"
            returnKeyType="next"
            onSubmitEditing={() => focusInput('passwordConfirmation')}
          />
          <Input
            name="passwordConfirmation"
            type="password"
            placeholder="*********"
            label="Confirmar nova senha"
          />
        </Form>
      </ContentTop>

      <ContentBottom>
        <Button
          content="Salvar nova senha"
          onPress={() => formRef.current.submitForm()}
        />
      </ContentBottom>
    </Container>
  );
}
