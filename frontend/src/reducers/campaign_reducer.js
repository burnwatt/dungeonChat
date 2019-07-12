import { 
  RECEIVE_CAMPAIGNS,
  RECEIVE_CAMPAIGN, 
  DELETE_CAMPAIGN
} from '../actions/campaign_actions';
import merge from "lodash/merge";

export default (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CAMPAIGNS:
      return merge({}, state, action.campaigns.data);
    case RECEIVE_CAMPAIGN:
      return merge({}, state, { [action.campaign.data._id]: action.campaign.data });
    case DELETE_CAMPAIGN:
      const newState = merge({}, state);
      delete newState[action.data.campaignId];
      return newState;
    default:
      return state;
  }

}

// When deleting campaign - characters array, messages array