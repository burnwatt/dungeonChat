import {
  getCampaigns,
  getUserCampaigns,
  getCampaign,
  getCampaignByName,
  postCampaign,
  updateCampaign,
  deleteCampaign
} from "../util/campaign_api_util";

export const RECEIVE_CAMPAIGNS = "RECEIVE_CAMPAIGNS";
export const RECEIVE_CAMPAIGN = "RECEIVE_CAMPAIGN";
export const RECEIVE_CAMPAIGN_ERRORS = "RECEIVE_CAMPAIGN_ERRORS";
export const DELETE_CAMPAIGN = "DELETE_CAMPAIGN"


const receiveCampaigns = campaigns => ({
  type: RECEIVE_CAMPAIGNS,
  campaigns: campaigns
});

const receiveCampaign = campaign => ({
  type: RECEIVE_CAMPAIGN,
  campaign: campaign
});

const receiveCampaignErrors = errors => ({
  type: RECEIVE_CAMPAIGN_ERRORS,
  errors: errors
});

const delCampaign = campaignId => ({
  type: DELETE_CAMPAIGN,
  campaignId: campaignId
});

// --------------------------------------------

export const fetchCampaigns = () => dispatch => getCampaigns()
  .then(campaigns => dispatch(receiveCampaigns(campaigns)))
  .catch(err => dispatch(receiveCampaignErrors(err)));

export const fetchUserCampaigns = userId => dispatch => getUserCampaigns(userId)
  .then(campaigns => dispatch(receiveCampaigns(campaigns)))
  .catch(err => dispatch(receiveCampaignErrors(err)));

export const fetchCampaign = campaignId => dispatch => getCampaign(campaignId)
  .then(campaign => dispatch(receiveCampaign(campaign)))
  .catch(err => dispatch(receiveCampaignErrors(err)));

export const fetchCampaignByName = name => dispatch => getCampaignByName(name)
  .then(campaign => dispatch(receiveCampaign(campaign)))
  .catch(err => dispatch(receiveCampaignErrors(err)));

// export const createCampaign = campaign => {
//   debugger
//   return dispatch => {
//     return postCampaign(campaign).then(campaign => {
//       dispatch(receiveCampaign(campaign))
//       return campaign;
//     })
//      .catch(err => dispatch(receiveCampaignErrors(err)))
//   }
// }

export const createCampaign = campaign => dispatch => postCampaign(campaign)
  .then(campaign => dispatch(receiveCampaign(campaign)))
  .catch(err => dispatch(receiveCampaignErrors(err)));
    
 

export const changeCampaign = campaign => dispatch => updateCampaign(campaign)
  .then(campaign => dispatch(receiveCampaign(campaign)))
  .catch(err => dispatch(receiveCampaignErrors(err)));

export const removeCampaign = campaignId => dispatch => deleteCampaign(campaignId)
  .then(() => dispatch(delCampaign(campaignId)))
  .catch(err => dispatch(receiveCampaignErrors(err)));

