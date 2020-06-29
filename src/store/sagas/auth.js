import Snackbar from 'react-native-snackbar';

import {call, put} from 'redux-saga/effects';

import api from '../../services/api';
import AuthActions from '../../store/ducks/auth';
import auth from '@react-native-firebase/auth';
import {toast_error} from '../../components/Toast';

export function* signIn({phone, password}) {
  try {
    const response = yield call(api.post, 'me', {
      phone,
      password,
    });

    const {token, user} = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(AuthActions.signInSuccess(token, user));
  } catch (err) {
    Snackbar.show({
      text: 'Erro ao entrar, tente novamente.',
      duration: Snackbar.LENGTH_SHORT,
      textColor: '#fff',
      backgroundColor: '#ff0000',
    });

    yield put(AuthActions.signInFailure());
  }
}

export function* getMe({userId}) {
  try {
    const response = yield call(api.get, `user/${userId}`);

    const user = response.data;

    yield put(AuthActions.getMeSuccess(user));
  } catch (err) {
    Snackbar.show({
      text: 'Houve algum erro.',
      duration: Snackbar.LENGTH_SHORT,
      textColor: '#fff',
      backgroundColor: '#ff0000',
    });

    yield put(AuthActions.signInFailure());
  }
}

export function* signUp(data) {
  try {
    const response = yield call(api.post, 'user', data.userData);

    const {token, user} = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(AuthActions.signUpSuccess(token, user));

    Snackbar.show({
      text: 'Cadastro feito com sucesso, seja bem vindo ao Grazing.',
      duration: Snackbar.LENGTH_SHORT,
      textColor: '#fff',
      backgroundColor: '#008000',
    });
  } catch (err) {
    console.log(err.response.data);
    if (err.response.data && err.response.data.error) {
      Snackbar.show({
        text: err.response.data.error[0],
        duration: Snackbar.LENGTH_SHORT,
        textColor: '#fff',
        backgroundColor: '#ff0000',
      });
    }

    yield put(AuthActions.signUpFailure());
  }
}

export function setToken({payload}) {
  if (!payload) {
    return;
  }

  const {token} = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function* signOut() {
  try {
    yield auth().signOut();
    Snackbar.show({
      text: 'Voce encerrou sua sessão com sucesso. Até Logo!',
      duration: Snackbar.LENGTH_SHORT,
      textColor: '#fff',
      backgroundColor: '#008000',
    });
  } catch (e) {
    console.log(e);
  }
}

export function* userAutentication() {
  yield put(AuthActions.autenticationSucess());
  Snackbar.show({
    text: 'Login feito com sucesso, seja bem vindo ao Grazing.',
    duration: Snackbar.LENGTH_SHORT,
    textColor: '#fff',
    backgroundColor: '#008000',
  });
}

export function* editUserData(data) {
  console.log(data.userData);
  try {
    if (data.userData.current_password !== '') {
      yield call(api.put, 'user/change-password', {
        _id: data.id,
        current_password: data.userData.current_password,
        new_password: data.userData.new_password,
      });
    }

    const response = yield call(api.put, 'user', {
      _id: data.id,
      name: data.userData.name,
      phone: data.userData.phone,
      address: data.userData.address,
    });

    yield put(AuthActions.editSuccess(response.data));

    Snackbar.show({
      text: 'Salvo com sucesso.',
      duration: Snackbar.LENGTH_SHORT,
      textColor: '#fff',
      backgroundColor: '#008000',
    });
  } catch (error) {
    yield put(AuthActions.editFailure());
    Snackbar.show({
      text: 'Houve um erro na alteração , verifique seus dados',
      duration: Snackbar.LENGTH_SHORT,
      textColor: '#fff',
      backgroundColor: '#ff0000',
    });
  }
}

export function* updateProfilePhoto(data) {
  try {
    const body = new FormData();

    body.append('_id', data.id);

    body.append('profile_photo', {
      uri: data.photo.uri,
      type: data.photo.type,
      name: data.photo.fileName,
    });

    const response = yield call(api.put, 'user/profile-photo', body);

    Snackbar.show({
      text: 'Salvo com sucesso.',
      duration: Snackbar.LENGTH_SHORT,
      textColor: '#fff',
      backgroundColor: '#008000',
    });

    yield put(AuthActions.updatePhotoSuccess(response.data.user));
  } catch (error) {
    console.log(error);
    yield put(AuthActions.editFailure());

    Snackbar.show({
      text: 'Houve um erro na alteração da foto de perfil, tente novamente',
      duration: Snackbar.LENGTH_SHORT,
      textColor: '#fff',
      backgroundColor: '#ff0000',
    });
  }
}
