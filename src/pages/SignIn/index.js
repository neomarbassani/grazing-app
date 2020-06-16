import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Form} from '@unform/mobile';
import * as Yup from 'yup';

import Container from '../../layout/Auth';

import LogoHeader from '../../components/LogoHeader';
import Input from '../../components/Input';
import Link from '../../components/Link';
import Button from '../../components/Button';

import AuthActions from '../../store/ducks/auth';

export default function SignIn({navigation}) {
  const dispatch = useDispatch();

  const formRef = useRef(null);

  const loading = useSelector(state => state.auth.loading);

  async function handleSubmit({phone, password}) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        phone: Yup.string().required('Um telefone é obrigatório'),

        password: Yup.string().required('Informe sua senha'),
      });

      await schema.validate(
        {phone, password},
        {
          abortEarly: false,
        },
      );

      dispatch(AuthActions.signInRequest(phone, password));
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
    focusInputField.focus();
  }

  return (
    <Container>
      <LogoHeader mt={50} mb={40} />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          maskType={'cel-phone'}
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) ',
          }}
          name="phone"
          label="Telefone"
          placeholder="(XX) XXXXX-XXXX"
          underlineColorAndroid="transparent"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => focusInput('password')}
        />
        <Input
          name="password"
          type="password"
          underlineColorAndroid="transparent"
          placeholder="*********"
          label="Senha"
        />
      </Form>
      <Link
        content="Esqueci minha senha"
        onPress={() => navigation.navigate('RecoveryPassword')}
        color="#D69D2B"
        alignSelf="flex-end"
      />

      <Link
        mt="auto"
        mb={25}
        content="Criar uma conta"
        onPress={() => navigation.navigate('Register')}
      />
      <Button
        mb={16}
        content="Login"
        onPress={() => formRef.current.submitForm()}
        loading={loading}
      />
    </Container>
  );
}
