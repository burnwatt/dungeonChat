import {
  RECEIVE_ALL_CHARACTERS,
  RECEIVE_NEW_CHARACTER,
  RECEIVE_UPDATED_CHARACTER,
  RECEIVE_CHARACTER
} from "../actions/character_actions";

import merge from "lodash/merge";

const initialState = {};

export default function(state = initialState, action) {
  // debugger
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_CHARACTERS:
      return merge({}, state, action.characters.data);
    case RECEIVE_NEW_CHARACTER:
      return merge({}, state, {[action.character.data._id]: action.character.data});
    case RECEIVE_CHARACTER:
      return merge({}, state, { [action.character.data._id]: action.character.data });
    case RECEIVE_UPDATED_CHARACTER:
      return merge({}, state, { [action.character.data._id]: action.character.data});
    default:
      return state;
  }
}

