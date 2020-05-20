import { combineReducers } from 'redux';

import { reducer as auth } from './auth';
import { reducer as calc } from './calc';
import { reducer as calcHistory } from './calcHistory';
import { reducer as offline } from 'redux-offline-queue';

export default combineReducers({ auth, calc, calcHistory, offline });
