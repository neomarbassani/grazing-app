import {call, put} from 'redux-saga/effects';
import Snackbar from 'react-native-snackbar';

import api from '../../services/api';
import CalcHistoryActions from '../../store/ducks/calcHistory';

export function* saveCalcToHistory({calcState}) {
  console.log(calcState);
  try {
    yield call(api.post, 'history', [calcState]);

    Snackbar.show({
      text: 'Salvo com sucesso.',
      duration: Snackbar.LENGTH_SHORT,
      textColor: '#fff',
      backgroundColor: '#008000',
    });
  } catch (err) {
    Snackbar.show({
      text: 'Erro ao salvar, tente novamente.',
      duration: Snackbar.LENGTH_SHORT,
      textColor: '#fff',
      backgroundColor: '#ff0000',
    });
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
