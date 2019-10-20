import { SET_CURRENT_USER, GET_CURRENT_USER } from '../constants/actionTypes';
import objectAssign from 'object-assign';

export default function authReducer(state = [], action) {

  switch (action.type) {
    case SET_CURRENT_USER: {
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        token: action.token,
        authErrorMsg: action.authErrorMsg
      };
    }
    case GET_CURRENT_USER: {
      return state;
    }
    default:
      return state;
  }
}