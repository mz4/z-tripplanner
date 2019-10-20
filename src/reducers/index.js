import { combineReducers } from 'redux';
import TripReducer from './tripsReducer';
import authReducer from './authReducer';

export default combineReducers({
  trips: TripReducer,
  auth: authReducer
});