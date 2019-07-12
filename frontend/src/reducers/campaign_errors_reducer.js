import { RECEIVE_CAMPAIGN_ERRORS } from "../actions/campaign_actions";

const CampaignErrorsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CAMPAIGN_ERRORS:
      return action.errors;
    default:
      return state;
  };
};

export default CampaignErrorsReducer;