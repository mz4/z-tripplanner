import { SET_CURRENT_USER, LOGOUT_CURRENT_USER } from '../constants/actionTypes';

/**
 * Dispatch action when user authentication state changes
 */
export function setAuth(isAuthenticated, token, authErrorMsg) {
  return {
    type: SET_CURRENT_USER,
    isAuthenticated,
    token,
    authErrorMsg,
  };
}

export function logoutAuth(isAuthenticated, token, authErrorMsg) {
  return {
    type: LOGOUT_CURRENT_USER,
    isAuthenticated,
    token,
    authErrorMsg,
  };
}
