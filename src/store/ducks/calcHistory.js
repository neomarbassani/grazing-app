import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { markActionsOffline } from 'redux-offline-queue';

const { Types, Creators } = createActions({
  addCalcToHistoryRequest: ['calcState'],
  addCalcToHistorySuccess: ['calcResponse'],
  addOfflineCalcToHistoryRequest: ['calcState'],
  addOfflineCalcToHistorySuccess: ['calcState'],
  addCalcToHistoryFailure: [],
});

markActionsOffline(Creators, ['addCalcToHistoryRequest']);

export const CalcHistoryTypes = Types;
export default Creators;

/* Initial State */
export const INITIAL_STATE = Immutable({
  calcHistory: [],
  loading: false,
});

/* Reducers */
export const addCalcRequest = (state) =>
  state.merge({
    loading: true,
  });

export const addOfflineCalcRequest = (state) =>
  state.merge({
    loading: true,
  });

export const addCalcFailure = (state) =>
  state.merge({
    loading: false,
  });

export const addOfflineCalcSuccess = (state, { calcState }) =>
  state.merge({
    loading: false,
    calcHistory: calcState,
  });

export const addCalcSuccess = (state) =>
  state.merge({
    loading: false,
  });

/* Reducers to types */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_CALC_TO_HISTORY_REQUEST]: addCalcRequest,
  [Types.ADD_CALC_TO_HISTORY_SUCCESS]: addCalcSuccess,
  [Types.ADD_CALC_TO_HISTORY_FAILURE]: addCalcFailure,
  [Types.ADD_OFFLINE_CALC_TO_HISTORY_REQUEST]: addOfflineCalcRequest,
  [Types.ADD_OFFLINE_CALC_TO_HISTORY_SUCCESS]: addOfflineCalcSuccess,
});
