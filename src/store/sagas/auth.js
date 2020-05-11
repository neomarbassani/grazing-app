import { Alert } from 'react-native';

import { call, put } from 'redux-saga/effects';

import api from '../../services/api';
import AuthActions from '../../store/ducks/auth';

export function* signIn({ email, password }) {
  try {
    const response = yield call(api.post, 'me', {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(AuthActions.signInSuccess(token, user));
  } catch (err) {
    Alert.alert('Erro', 'Houve um erro no login, verifique seus dados');
    yield put(AuthActions.signInFailure());
  }
}

export function* signUp(data) {
  try {
    const response = yield call(api.post, 'user', data.userData);

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(AuthActions.signUpSuccess(token, user));
  } catch (err) {
    Alert.alert('Erro', 'Houve um erro no cadastro, verifique seus dados');
    yield put(AuthActions.signUpFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) {
    return;
  }

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {}

export function* userAutentication() {
  yield put(AuthActions.autenticationSucess());
}
