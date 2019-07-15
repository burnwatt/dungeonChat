import { 
  setAuthToken,
  loginUser,
  signupUser
 } from "../util/session_api_util";
import jwt_decode from "jwt-decode";

export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser: currentUser
});

export const receiveUserSignIn = () => ({
  type: RECEIVE_USER_SIGN_IN
});

export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors: errors
});

export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
});

// ----------------------------------------------------------

export const signup = user => dispatch => signupUser(user)
  .then(
    () => dispatch(receiveUserSignIn()),
    err => dispatch(receiveErrors(err.response.data))
  );

export const login = user => dispatch => loginUser(user)
  .then(
    res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decodeUser = jwt_decode(token);
      dispatch(receiveCurrentUser(decodeUser));
    })
  .catch(err => dispatch(receiveErrors(err.response.data)));

export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(logoutUser());
};