import { all, takeLatest } from 'redux-saga/effects';

import { AuthTypes } from '../ducks/auth';

import { setToken, signIn, signOut } from './auth';

export default function* rootSaga() {
  return yield all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
    takeLatest(AuthTypes.SIGN_OUT, signOut),
  ]);
}
