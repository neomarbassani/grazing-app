import { combineReducers } from 'redux';

import { reducer as auth } from './auth';
import { reducer as calc } from './calc';

export default combineReducers({ auth, calc });
