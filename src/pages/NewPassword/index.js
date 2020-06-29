import React, {useRef, useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {Form} from '@unform/mobile';
import Snackbar from 'react-native-snackbar';

import * as Yup from 'yup';

import Container from '../../layout/Auth';

import Title from '../../components/Title';
import LogoHeader from '../../components/LogoHeader';
import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';

export default function SignIn({navigation, route}) {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [token, setToken] = useState('');

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

      Snackbar.show({
        text: 'Senha alterada com sucesso.',
        duration: Snackbar.LENGTH_LONG,
        textColor: '#fff',
        backgroundColor: '#008000',
      });
      navigation.navigate('Login');

      setLoading(false);
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }
      Snackbar.show({
        text: 'Erro ao alterar senha, tente novamente',
        duration: Snackbar.LENGTH_SHORT,
        textColor: '#fff',
        backgroundColor: '#ff0000',
      });

      setLoading(false);
    }
  }

  function focusInput(field) {
    const focusInputField = formRef.current.getFieldRef(field);
    focusInputField.focus();
  }

  useEffect(() => {
    if (route.params.token) {
      setToken(route.params.token);
    }
  }, [route]);

  return (
    <Container>
      <LogoHeader mt={50} mb={40} />
      <Title value="Criar nova senha" size={14} mb={16} />
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

      <Button
        content="Salvar nova senha"
        onPress={() => formRef.current.submitForm()}
        loading={loading}
        mt="auto"
        mb={16}
      />
    </Container>
  );
}
