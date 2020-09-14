import {call, put} from 'redux-saga/effects';
import Snackbar from 'react-native-snackbar';

import api from '../../services/api';
import CalcHistoryActions from '../../store/ducks/calcHistory';

export function* saveCalcToHistory({calcState}) {
  try {
    let payload = calcState;
    payload.created_at = new Date();
    yield call(api.post, 'history', [payload]);

  } catch (err) {
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
  }
}
