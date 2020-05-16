import React, { useRef, useState } from 'react';
import { Alert } from 'react-native';
import { Form } from '@unform/mobile';

import * as Yup from 'yup';

import { Container, ContentBottom, ContentTop } from '../../layout/Auth';

import Title from '../../components/Title';
import LogoHeader from '../../components/LogoHeader';
import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';

export default function SignIn({ navigation }) {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const { token } = navigation.state.params;

  async function handleSubmit(data) {
    setLoading(true);
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

      await api.post('user/recover-password', {
        token,
        password: data.password,
      });

      Alert.alert('Sucesso', 'Senha alterada com sucesso', [
        {
          text: 'Ok',
          onPress: () => navigation.navigate('Login'),
        },
      ]);

      setLoading(false);
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }
      Alert.alert('Erro', 'Erro ao alterar senha, tente novamente', []);
      setLoading(false);
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
          loading={loading}
        />
      </ContentBottom>
    </Container>
  );
}
