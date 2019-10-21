import { SET_CURRENT_USER } from '../constants/actionTypes';

/**
 * Dispatch action when user authentication state changes
 */
function setAuth(isAuthenticated, token, authErrorMsg) {
  return {
    type: SET_CURRENT_USER,
    isAuthenticated,
    token,
    authErrorMsg,
  };
}

export default setAuth;