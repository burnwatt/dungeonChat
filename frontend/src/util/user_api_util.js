import axios from "axios";

export const getUser = userId => (
  axios.get(`/api/users/${userId}`)
);