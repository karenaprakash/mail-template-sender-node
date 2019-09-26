/**
 * rootReducer : combine all reducers
 * 
 */
import { combineReducers } from 'redux';
import mail from './mail_reducer';
import users from './users_reducer';

import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  mail,
  users,
  form : formReducer
});

export default rootReducer;