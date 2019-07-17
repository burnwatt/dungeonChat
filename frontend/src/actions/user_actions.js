import {
  getUser,
  getCampaignUsers,
  updateUser
} from "../util/user_api_util";
import { getCampaign } from "../util/campaign_api_util";

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USERS = "RECEIVE_USERS";


const receiveUser = user => ({
  type: RECEIVE_USER,
    user: user
  });

const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users: users
});

export const fetchUser = user => dispatch => getUser(user)
  .then(user => dispatch(receiveUser(user)))

export const fetchCampaignUsers = users => dispatch => getCampaignUsers(users)
  .then(users => dispatch(receiveUsers(users)));

export const changeUser = user => dispatch => updateUser(user)
  .then(user => dispatch(receiveUser(user)));