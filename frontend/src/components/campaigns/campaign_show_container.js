import { connect } from 'react-redux';
import { fetchCampaign, fetchCampaignByName } from "../../actions/campaign_actions";
import { createMessage } from "../../actions/message_actions";
import { fetchUser } from "../../actions/user_actions";
import { getCampaignCharacters, getCharacter } from "../../actions/character_actions";
import CampaignShow from './campaign_show';

const mSP = (state, ownProps) => {

  let campName = ownProps.match.params.name;
  let campaign = Object.values(state.campaigns).filter(camp => camp.name = campName)[0];

  return {
    currentUser: Object.assign({}, state.session.user, state.users[state.session.user.id]),
    campaign: campaign,
    campaigns: state.campaigns,
    characters: state.characters,
    messages: state.messages
  }
};

const mDP = dispatch => ({
  fetchCampaign: campaignId => dispatch(fetchCampaign(campaignId)),
  getCharacter: characterId => dispatch(getCharacter(characterId)),
  fetchCampaignByName : campaignName => dispatch(fetchCampaignByName(campaignName)),
  fetchUser: userId => dispatch(fetchUser(userId)),
  getCampaignCharacters: (character_ids) => dispatch(getCampaignCharacters(character_ids)),
  createMessage: message => dispatch(createMessage(message))
})

export default connect(mSP, mDP)(CampaignShow);