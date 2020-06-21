/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import * as Yup from 'yup';
import {Form} from '@unform/mobile';
import Snackbar from 'react-native-snackbar';

import backgroundLogo from '../../assets/backgroundLogo.png';

import Container from '../../layout/App';

import SubTitle from '../../components/SubTitle';
import CalcHeader from '../../components/CalcHeader';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {Content} from './styles';

const Contact = ({navigation, route}) => {
  const formRef = useRef(null);

  async function handleSubmit({message}) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        message: Yup.string().required('Insira uma mensagem.'),
      });

      await schema.validate(
        {message},
        {
          abortEarly: false,
        },
      );

      Snackbar.show({
        text: 'Mensagem enviada com sucesso.',
        duration: Snackbar.LENGTH_SHORT,
        textColor: '#fff',
        backgroundColor: '#008000',
      });

      navigation.navigate('Home');

      formRef.current.reset();
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }

      Snackbar.show({
        text: 'Erro ao salvar, tente novamente.',
        duration: Snackbar.LENGTH_SHORT,
        textColor: '#fff',
        backgroundColor: '#ff0000',
        action: {
          text: 'TENTAR NOVAMENTE',
          textColor: 'white',
          onPress: () => {
            console.log('ok');
          },
        },
      });
    }
  }

  return (
    <Container
      source={backgroundLogo}
      imageStyle={{
        top: 0,
        height: '90%',
      }}>
      <Content>
        <SubTitle
          value="Precisa de ajuda? Entre em contato conosco"
          size={14}
          mb={20}
        />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            textarea
            name="message"
            label="Mensagem"
            keyboardType="çihlugkyh"
            placeholder="Escreva a mensagem aqui"
          />
        </Form>
        <Button
          content="Enviar"
          mt={20}
          mb={20}
          color="#D69D2B"
          onPress={() => formRef.current.submitForm()}
        />
      </Content>
    </Container>
  );
};

export default Contact;
