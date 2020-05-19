import { call, put } from 'redux-saga/effects';

import api from '../../services/api';
import CalcHistoryActions from '../../store/ducks/calcHistory';

export function* saveCalcToHistory({ calcState }) {
  try {
    const response = yield call(api.post, 'history', [
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

    yield put(CalcHistoryActions.addCalcToHistorySuccess(response.data[0]));
  } catch (err) {
    yield put(CalcHistoryActions.addCalcToHistoryFailure());
  }
}
