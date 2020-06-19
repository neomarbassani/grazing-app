import {call, put} from 'redux-saga/effects';
import Snackbar from 'react-native-snackbar';

import api from '../../services/api';
import CalcHistoryActions from '../../store/ducks/calcHistory';

export function* saveCalcToHistory({calcState}) {
  console.log(calcState);
  try {
    const response = yield call(api.post, 'history', [calcState]);
    console.log('ok');
  } catch (err) {
    console.log('error');
    yield put(CalcHistoryActions.addCalcToHistoryFailure());
  }
}

export function* saveOfflineCalcs({calcState}) {
  try {
    yield put(
      CalcHistoryActions.addOfflineCalcToHistorySuccess({
        calcState,
      }),
    );
  } catch (err) {
    yield put(CalcHistoryActions.addCalcToHistoryFailure());
    console.log('error');
  }
}
