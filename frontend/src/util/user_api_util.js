import axios from "axios";

export const getUser = userId => (
  axios.get(`/api/users/${userId}`)
);

export const getCampaignUsers = campaignId => (
  axios.get(`/api/users/campaign/${campaignId}`)
);

export const updateUser = user => (
  axios.post(`/api/users/${user._id}`, user)
);