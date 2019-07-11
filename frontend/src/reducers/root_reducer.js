import { combineReducers } from "redux";
import session from "./session_reducer";
import errors from './errors_reducer';
import characters from './character_reducer';

const RootReducer = combineReducers({
  session,
  errors,
  characters
});

export default RootReducer;