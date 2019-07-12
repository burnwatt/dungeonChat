import {
  getUser
} from "../util/user_api_util";

export const RECEIVE_USER = "RECEIVE_USER";


const receiveUser = user => ({
  type: RECEIVE_USER,
    user: user
  });


export const fetchUser = user => dispatch => getUser(user)
  .then(user => dispatch(receiveUser(user)))

