import { combineReducers } from 'redux';
import TripReducer from './tripsReducer';

export default combineReducers({
  trips: TripReducer
});