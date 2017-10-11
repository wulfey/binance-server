import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import MarketReducer from './marketReducer';
import InitializingReducer from './initializingReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  auth: AuthReducer,
  queryResults: MarketReducer,
  form: formReducer,
  initializeForm: InitializingReducer
});
