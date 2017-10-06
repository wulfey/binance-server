import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import AllMarketsReducer from './marketReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  auth: AuthReducer,
  allMarkets: AllMarketsReducer,
  form: formReducer
});
