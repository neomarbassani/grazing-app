import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  setCalcConfig: ['calcConfig'],
  setAnimalConfig: ['animalConfig'],
  setPastureConfig: ['pastureConfig'],
  setInputs: ['inputs'],
  setResults: ['results'],
});

export const CalcTypes = Types;
export default Creators;

/* Initial State */
export const INITIAL_STATE = Immutable({
  calc: {},
  animal: {},
  pasture: {},
  inputs: [],
  results: [],
});

/* Reducers */

export const setCalc = (state, { calcConfig }) =>
  state.merge({
    calc: calcConfig,
  });

export const setAnimal = (state, { animalConfig }) =>
  state.merge({
    animal: animalConfig,
  });

export const setPasture = (state, { pastureConfig }) =>
  state.merge({
    pasture: pastureConfig,
  });

export const setInputs = (state, { inputs }) =>
  state.merge({
    inputs,
  });

export const setResults = (state, { results }) =>
  state.merge({
    results,
  });

/* Reducers to types */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_CALC_CONFIG]: setCalc,
  [Types.SET_ANIMAL_CONFIG]: setAnimal,
  [Types.SET_PASTURE_CONFIG]: setPasture,
  [Types.SET_INPUTS]: setInputs,
  [Types.SET_RESULTS]: setResults,
});
