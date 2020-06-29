/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import {useDispatch, useSelector} from 'react-redux';

import {Form} from '@unform/mobile';
import * as Yup from 'yup';

import AuthActions from '../../store/ducks/auth';

import Icon from 'react-native-vector-icons/Feather';

import Container from '../../layout/App';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Link from '../../components/Link';
import Avatar from '../../components/Avatar';
import InputPicker from '../../components/InputPicker';

import backgroundLogo from '../../assets/backgroundLogo.png';

import {
  ChangePhotoButton,
  PhotoContainer,
  UserNameField,
  Content,
  SectionTitle,
  FormArea,
} from './styles';

import locations from '../../services/locations';

const Profile = () => {
  const user = useSelector(state => state.auth.user);

  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(user.address.state);
  const [selectedCity, setSelectedCity] = useState(user.address.city);

  const formRef = useRef(null);

  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);

  const userId = user._id;

  useEffect(() => {
    const statesArray = locations.reduce((acc, state) => {
      return [...acc, state.sigla];
    }, []);
    setStates(statesArray);
  }, []);

  useEffect(() => {
    dispatch(AuthActions.getMeRequest(userId));
    handleAvailableCities(user.address.state);
  }, [dispatch, user._id, user.address.state, userId, user.profile_photo]);

  const handleAvailableCities = stateName => {
    if (stateName) {
      const availableCities = locations.find(state => state.sigla === stateName)
        .cidades;

      setCities(availableCities);
    }
  };

  async function handleSubmit(userData) {
    userData.address = {
      city: selectedCity,
      state: selectedState,
    };

    console.log(userData);

    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string()
          .min(3, 'Insira seu nome')
          .max(200, 'Insira seu nome'),

        email: Yup.string().email('Insira um e-mail válido.'),

        property_size: Yup.string().min(
          0,
          'O tamanho da propriedade é obrigatório',
        ),

        phone: Yup.string()
          .min(10, 'Telefone é obrigatório')
          .max(11, 'Telefone é obrigatório'),

        current_password: Yup.string()
          .default(() => null)
          .nullable(),

        new_password: Yup.string().when(
          'current_password',
          (current_password, field) =>
            current_password !== ''
              ? field
                  .required('Insira sua nova senha')
                  .min(6, 'No mínimo 6 caracteres')
              : field,
        ),

        new_password_confirmation: Yup.string().when(
          'current_password',
          (current_password, field) =>
            current_password !== ''
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
    <Container
      source={backgroundLogo}
      imageStyle={{
        top: 0,
        height: '90%',
      }}>
      <Content
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          width: '100%',
          paddingHorizontal: 30,
          alignItems: 'center',
        }}>
        <PhotoContainer>
          <Avatar loading={loading} size={120} />
          <ChangePhotoButton onPress={() => changePhoto()}>
            <Icon name="camera" size={16} color="#ffffff" />
          </ChangePhotoButton>
        </PhotoContainer>
        <UserNameField>{user.name}</UserNameField>
        <FormArea>
          <Form
            ref={formRef}
            initialData={{
              name: user.name ? user.name : '',
              email: user.email ? user.email : '',
              phone: user.phone ? user.phone : '',
              property_size: user.property_size ? user.property_size : '',
              current_password: '',
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
              returnKeyType="next"
              onSubmitEditing={() => focusInput('property_size')}
              inittialState={user.phone ? user.phone : null}
            />
            <Input
              name="property_size"
              keyboardType="numeric"
              label="Tamanho da propriedade (hectares)"
              placeholder="25 hectares"
              returnKeyType="next"
              blurOnSubmit={true}
            />
            <InputPicker
              label="Estado"
              data={states}
              width={40}
              prompt="Escolha um estado"
              selectedValue={selectedState}
              onValueChange={value => {
                setSelectedState(value);
                handleAvailableCities(value);
              }}
            />
            <InputPicker
              label="Cidade"
              data={cities}
              width={55}
              prompt="Escolha uma cidade"
              selectedValue={selectedCity}
              onValueChange={value => {
                setSelectedCity(value);
              }}
            />
            <SectionTitle>ALTERAR SENHA</SectionTitle>
            <Input
              name="current_password"
              label="Senha atual"
              type="password"
              placeholder="*******"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              returnKeyType="next"
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
              returnKeyType="done"
            />
          </Form>
        </FormArea>

        <Button
          content="Salvar"
          onPress={() => {
            formRef.current.submitForm();
          }}
          loading={loading}
          mt={30}
        />
        <Link
          content="Sair"
          mt={30}
          mb={60}
          onPress={() => {
            dispatch(AuthActions.signOut());
          }}
        />
      </Content>
    </Container>
  );
};

export default Profile;
