import { combineReducers } from 'redux';

import { reducer as auth } from './auth';
import { reducer as calc } from './calc';
import { reducer as calcHistory } from './calcHistory';

export default combineReducers({ auth, calc, calcHistory });
