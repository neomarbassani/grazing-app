import { all, takeLatest, fork } from 'redux-saga/effects';

import { AuthTypes } from '../ducks/auth';
import { CalcHistoryTypes } from '../ducks/calcHistory';

import {
  setToken,
  signIn,
  signOut,
  signUp,
  userAutentication,
  editUserData,
  updateProfilePhoto,
} from './auth';

import { saveCalcToHistory } from './calcHistory';

import { startWatchingNetworkConnectivity } from './offline';

export default function* rootSaga() {
  return yield all([
    fork(startWatchingNetworkConnectivity),
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
    takeLatest(AuthTypes.SIGN_UP_REQUEST, signUp),
    takeLatest(AuthTypes.SIGN_OUT, signOut),
    takeLatest(AuthTypes.AUTENTICATION_REQUEST, userAutentication),
    takeLatest(AuthTypes.EDIT_REQUEST, editUserData),
    takeLatest(AuthTypes.UPDATE_PHOTO_REQUEST, updateProfilePhoto),
    takeLatest(CalcHistoryTypes.ADD_CALC_TO_HISTORY_REQUEST, saveCalcToHistory),
  ]);
}
