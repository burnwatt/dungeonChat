import {
  RECEIVE_USER
} from "../actions/user_actions";
import merge from "lodash/merge";

export default (state={}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USER:
      return merge({}, state, { [action.user.data._id]: action.user.data});
    default:
      return state;
  }
};