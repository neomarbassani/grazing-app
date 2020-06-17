import {Alert} from 'react-native';

import {call, put} from 'redux-saga/effects';

import api from '../../services/api';
import AuthActions from '../../store/ducks/auth';
import auth from '@react-native-firebase/auth';

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
    Alert.alert('Erro', 'Houve um erro no login, verifique seus dados');
    yield put(AuthActions.signInFailure());
  }
}

export function* getMe({userId}) {
  console.log(userId);
  try {
    const response = yield call(api.get, `user/${userId}`);

    const user = response.data;

    yield put(AuthActions.getMeSuccess(user));
  } catch (err) {
    Alert.alert('Erro', 'Houve um erro no login, verifique seus dados');
    yield put(AuthActions.signInFailure());
  }
}

export function* signUp(data) {
  try {
    const response = yield call(api.post, 'user', data.userData);

    const {token, user} = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(AuthActions.signUpSuccess(token, user));
  } catch (err) {
    Alert.alert('Erro', 'Houve um erro no cadastro, verifique seus dados');

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
  } catch (e) {
    console.log(e);
  }
}

export function* userAutentication() {
  yield put(AuthActions.autenticationSucess());
}

export function* editUserData(data) {
  try {
    if (data.userData.current_password !== null) {
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
    });

    yield put(AuthActions.editSuccess(response.data));

    Alert.alert('Sucesso', 'Alteração concluida com sucesso!');
  } catch (error) {
    yield put(AuthActions.editFailure());
    Alert.alert('Erro', 'Houve um erro na alteração , verifique seus dados');
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

    //Alert.alert('Sucesso', 'Foto de perfil alterada com sucesso');
    yield put(AuthActions.updatePhotoSuccess(response.data.user));
  } catch (error) {
    console.log(error);
    yield put(AuthActions.editFailure());

    Alert.alert(
      'Erro',
      'Houve um erro na alteração da foto de perfil, tente novamente',
    );
  }
}
