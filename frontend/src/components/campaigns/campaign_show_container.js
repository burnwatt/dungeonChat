import { connect } from 'react-redux';
import { fetchCampaign } from "../../actions/campaign_actions";
import { getCampaignCharacters } from "../../actions/character_actions";
import CampaignShow from './campaign_show';

const mSP = (state, ownProps) => ({
  currentUser: ownProps.currentUser,
  campaign: ownProps.campaign,
  characters: state.characters
  // messages: state.messages,
});

const mDP = dispatch => ({
  fetchCampaign: campaignId => dispatch(fetchCampaign(campaignId)),
  getCampaignCharacters: (character_ids) => dispatch(getCampaignCharacters(character_ids))
})

export default connect(mSP, mDP)(CampaignShow);