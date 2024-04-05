import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import subjectReducer from './subjectReducer';
import orderReducer from './orderReducer';

export default combineReducers({
  item: itemReducer,
  error: errorReducer,
  auth: authReducer,
  subject: subjectReducer,
  order: orderReducer
});
