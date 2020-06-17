import React, {useRef, useEffect} from 'react';
import {Alert} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import {useDispatch, useSelector} from 'react-redux';

import {Form} from '@unform/mobile';
import * as Yup from 'yup';

import AuthActions from '../../store/ducks/auth';

import Icon from 'react-native-vector-icons/Feather';

import Container from '../../layout/App/Container';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Link from '../../components/Link';
import Avatar from '../../components/Avatar';
import PlanInfoBox from '../../components/PlanInfoBox';

import {
  ChangePhotoButton,
  PhotoContainer,
  TopContent,
  UserNameField,
  Content,
  SectionTitle,
} from './styles';

const Profile = () => {
  const user = useSelector(state => state.auth.user);
  const formRef = useRef(null);

  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);

  const userId = user._id;

  useEffect(() => {
    dispatch(AuthActions.getMeRequest(userId));
  }, [dispatch, user._id, userId]);

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
          .nullable()
          .default(() => null),

        new_password: Yup.string()
          .min(6, 'No mínimo 6 caracteres')
          .when('current_password', (current_password, field) =>
            current_password !== null
              ? field.required('Insira sua nova senha')
              : field,
          ),

        new_password_confirmation: Yup.string().when(
          'current_password',
          (current_password, field) =>
            current_password !== null
              ? field
                  .oneOf(
                    [Yup.ref('new_password')],
                    'As senhas devem ser iguais',
                  )
                  .required('Confirme sua senha')
              : field,
        ),
      });

      await schema.validate(userData, {
        abortEarly: false,
      });

      dispatch(AuthActions.editRequest(userData, user._id));
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

  async function sendPhoto(data) {
    try {
      dispatch(AuthActions.updatePhotoRequest(data, user._id));
    } catch (error) {
      Alert.alert('Error', 'Ocorreu algum erro,tente novamente mais tarde.');
    }
  }

  function takePhoto() {
    ImagePicker.launchCamera({}, res => {
      if (!res.didCancel) {
        sendPhoto(res);
      }
    });
  }

  function selectPhoto() {
    ImagePicker.launchImageLibrary({}, res => {
      if (!res.didCancel) {
        sendPhoto(res);
      }
    });
  }

  async function changePhoto() {
    Alert.alert(
      'Atualizar foto de perfil',
      'Como deseja atualizar a foto de perfil?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Selecionar',
          onPress: () => selectPhoto(),
        },
        {
          text: 'Tirar',
          onPress: () => takePhoto(),
        },
      ],
    );
  }

  function focusInput(field) {
    const focusInputField = formRef.current.getFieldRef(field);

    if (typeof focusInputField.focus === 'function') {
      focusInputField.focus();
    } else {
      focusInputField.getElement().focus();
    }
  }

  return (
    <Container>
      <TopContent>
        <PhotoContainer>
          <Avatar loading={loading} size={120} />
          <ChangePhotoButton onPress={() => changePhoto()}>
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
            onSubmitEditing={() => focusInput('phone')}
          />
          <Input
            name="email"
            type="email"
            label="E-mail"
            editable={false}
            underlineColorAndroid="transparent"
            returnKeyType="next"
          />
          <Input
            name="phone"
            label="Telefone"
            maskedType={'cel-phone'}
            underlineColorAndroid="transparent"
            returnKeyType="done"
            inittialState={user.phone}
          />
          <SectionTitle>ALTERAR SENHA</SectionTitle>
          <Input
            name="current_password"
            label="Senha atual"
            type="password"
            placeholder="*******"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            returnKeyType="done"
            onSubmitEditing={() => focusInput('new_password')}
          />
          <Input
            name="new_password"
            type="password"
            placeholder="*******"
            label="Nova senha"
            underlineColorAndroid="transparent"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={() => focusInput('new_password_confirmation')}
          />
          <Input
            name="new_password_confirmation"
            placeholder="*******"
            autoCorrect={false}
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
      <PlanInfoBox />
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
