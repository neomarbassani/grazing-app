import {call, put} from 'redux-saga/effects';

import api from '../../services/api';
import CalcHistoryActions from '../../store/ducks/calcHistory';

export function* saveCalcToHistory({calcState}) {
  try {
    yield call(api.post, 'history', [
      {
        config: {
          calc: calcState.calc,
          animal: calcState.animal,
          pasture: calcState.pasture,
        },
        inputs: calcState.inputs,
        results: calcState.results,
      },
    ]);
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
    console.log('error');
  }
}
