import React from "react";
import ReactDOM from "react-dom";

import Root from "./components/root";
import configureStore from "./store/store";
import jwt_decode from "jwt-decode";

import { setAuthToken } from "./util/session_api_util";
import { logout } from "./actions/session_actions";

import "./assets/styles/output.css";

//TESTING
import * as charActions from "./actions/character_actions";
//END TESTING

document.addEventListener("DOMContentLoaded", () => {
  let store;

  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decodeUser = jwt_decode(localStorage.jwtToken);

    const preloadedState = { session: { isAuthenticated: true, user: decodeUser }};

    store = configureStore(preloadedState);

    const currentTime = Date.now() / 1000;

    if (decodeUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = "/login";
    }
  } else store = configureStore({});

  //TESTING
  window.charActions = charActions;
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  //END TESTING

  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store} />, root);
});
