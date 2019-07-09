import axios from "axios";

export const setAuthToken = token => {
  if (token) axios.defaults.headers.common["Authorization"] = token
  else delete axios.defaults.headers.common["Authorization"];
};

export const signupUser = userData => (
  axios.post("/api/users/register", userData)
);

export const loginUser = userData => (
  axios.post("/api/users/login", userData)
);
