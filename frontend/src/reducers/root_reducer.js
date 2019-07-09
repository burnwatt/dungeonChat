import { combineReducers } from "redux";
import sessionReducer from "./session_reducer";
import sessionErrorsReducer from './session_errors_reducer';

const RootReducer = combineReducers({
  session: sessionReducer,
  errors: sessionErrorsReducer,
});

export default RootReducer;