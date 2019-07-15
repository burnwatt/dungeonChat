import {
  RECEIVE_MESSAGES, 
  RECEIVE_MESSAGE,
  DELETE_MESSAGE
} from '../actions/message_actions';
import merge from "lodash/merge";

export default (state = {}, action) => {
  Object.freeze(state);
  let newState; 
  switch (action.type) {
    case RECEIVE_MESSAGES:
      return merge({}, state, action.messages.data);
      case RECEIVE_MESSAGE:
      return merge({}, state, { [action.message.data._id]: action.message.data});
    case DELETE_MESSAGE:
      newState = merge({}, state);
      delete newState[action.data.messageId];
      return newState;
    default: 
      return state; 
  }
}

