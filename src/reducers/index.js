import { combineReducers } from 'redux';
import storeReducer from './storeReducer';
import menuReducer from './menuReducer';

export default combineReducers({
  stores: storeReducer,
  menus: menuReducer
});
