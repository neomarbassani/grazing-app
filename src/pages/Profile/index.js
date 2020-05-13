import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import AuthActions from '../../store/ducks/auth';

import Icon from 'react-native-vector-icons/Feather';

import Container from '../../layout/App/Container';

import profilePhotoPlaceholder from '../../assets/placeholder-profile.png';

import Input from '../../components/Input';
import MaskedInput from '../../components/MaskedInput';
import Button from '../../components/Button';
import Link from '../../components/Link';

import {
  ChangePhotoButton,
  ProfilePhoto,
  PhotoContainer,
  TopContent,
  UserNameField,
  Content,
  SectionTitle,
} from './styles';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const formRef = useRef(null);

  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading);

  async function handleSubmit(userData) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string()
          .min(3, 'Insira seu nome')
          .max(200, 'Insira seu nome'),
        email: Yup.string().email('Insira um e-mail válido.'),
        phone: Yup.string()
          .min(10, 'Telefone é obrigatório')
          .max(11, 'Telefone é obrigatório'),
        current_password: Yup.string()
          .min(6, 'No mínimo 6 caracteres')
          .nullable(),
        new_password: Yup.string().min(6, 'No mínimo 6 caracteres'),
        new_password_confirmation: Yup.string().oneOf(
          [Yup.ref('new_password'), null],
          'Senhas não conferem',
        ),
      });

      await schema.validate(userData, {
        abortEarly: false,
      });

      dispatch(AuthActions.editRequest(userData, user._id));
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <Container>
      <TopContent>
        <PhotoContainer>
          <ProfilePhoto
            source={
              (user.profile_photo && { uri: user.profile_photo }) ||
              profilePhotoPlaceholder
            }
          />
          <ChangePhotoButton>
            <Icon name="camera" size={16} color="#ffffff" />
          </ChangePhotoButton>
        </PhotoContainer>
        <UserNameField>{user.name}</UserNameField>
      </TopContent>
      <Content>
        <Form
          ref={formRef}
          initialData={{
            name: user.name,
            email: user.email,
            phone: user.phone,
            current_password: null,
          }}
          onSubmit={handleSubmit}>
          <SectionTitle>INFORMAÇÕES PESSOAIS</SectionTitle>
          <Input
            name="name"
            label="Nome"
            underlineColorAndroid="transparent"
            returnKeyType="next"
          />
          <Input
            name="email"
            type="email"
            label="E-mail"
            editable={false}
            underlineColorAndroid="transparent"
            returnKeyType="next"
          />
          <MaskedInput
            name="phone"
            label="Telefone"
            type={'cel-phone'}
            underlineColorAndroid="transparent"
            returnKeyType="next"
            inittialState={user.phone}
          />
          <SectionTitle>ALTERAR SENHA</SectionTitle>
          <Input
            name="current_password"
            label="Senha atual"
            type="password"
            placeholder="*******"
            underlineColorAndroid="transparent"
            returnKeyType="done"
          />
          <Input
            name="new_password"
            type="password"
            placeholder="*******"
            label="Nova senha"
            underlineColorAndroid="transparent"
            returnKeyType="next"
          />
          <Input
            name="new_password_confirmation"
            placeholder="*******"
            type="password"
            label="Confirmar nova senha"
            underlineColorAndroid="transparent"
            returnKeyType="next"
          />
        </Form>
      </Content>
      <Button
        content="Salvar"
        onPress={() => {
          formRef.current.submitForm();
        }}
        loading={loading}
      />
      <Link
        content="Sair"
        mt={24}
        onPress={() => {
          dispatch(AuthActions.signOut());
        }}
      />
    </Container>
  );
};

export default Profile;
