import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Actions Creators */
const { Types, Creators } = createActions({
  signInRequest: ['email', 'password'],
  signInSuccess: ['token', 'user'],
  signInFailure: [],
  signOut: [],
});

export const AuthTypes = Types;
export default Creators;

/* Initial State */
export const INITIAL_STATE = Immutable({
  token: null,
  signed: false,
  loading: false,
});

/* Reducers */
export const request = (state) => state.merge({ loading: true });

export const success = (state, { token, user }) =>
  state.merge({
    signed: true,
    loading: false,
    token,
  });

export const failure = (state) => state.merge({ loading: false });

export const logout = (state) => state.merge({ token: null, signed: false });

/* Reducers to types */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGN_IN_REQUEST]: request,
  [Types.SIGN_IN_SUCCESS]: success,
  [Types.SIGN_IN_FAILURE]: failure,
  [Types.SIGN_OUT]: logout,
});
