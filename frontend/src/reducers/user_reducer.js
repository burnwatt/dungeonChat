import {
  RECEIVE_USER,
  RECEIVE_USERS
} from "../actions/user_actions";
import merge from "lodash/merge";

export default (state={}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USER:
      return merge({}, state, { [action.user.data._id]: action.user.data});
    case RECEIVE_USERS:
      return merge({}, state, action.users.data)
    default:
      return state;
  }
};