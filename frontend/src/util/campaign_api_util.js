import axios from "axios";

// GETS -------------------------------------------

export const getCampaigns = () => (
  axios.get("/api/campaigns")
);

export const getUserCampaigns = user_id => (
  axios.get(`/api/campaigns/user/${user_id}`)
);

export const getCampaign = campaign_id => (
  axios.get(`/api/campaigns/${campaign_id}`)
);

export const getCampaignByName = name => (
  axios.get(`/api/campaigns/name/${name}`)
);

// POSTS ---------------------------------------------

export const postCampaign = campaign => (
  axios.post("/api/campaigns/", campaign)
);

// UPDATE ---------------------------------

export const updateCampaign = campaign => (
  axios.post(`/api/campaigns/update/`, campaign)
);

// DELETE ----------------------------------

export const deleteCampaign = campaign_id => (
  axios.post("/api/campaigns/delete/", campaign_id)
);
