import {
  RECEIVE_SESSION_ERRORS,
  RECEIVE_CURRENT_USER
} from "../actions/session_actions";

const _nullErr = {};

const SessionErrorsReducer = (state = _nullErr, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
      return _nullErr;
    default:
      return state;
  };
};

export default SessionErrorsReducer;