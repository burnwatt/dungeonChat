import { connect } from 'react-redux';
import {
  fetchImg
} from "../../actions/img_actions";
import { fetchCampaign, fetchCampaignByName } from "../../actions/campaign_actions";
import { createMessage } from "../../actions/message_actions";
import { fetchUser } from "../../actions/user_actions";
import { getCampaignCharacters, getCharacter } from "../../actions/character_actions";
import CampaignShow from './campaign_show';
import { openModal } from "../../actions/ui/modal_actions";


const mSP = (state, ownProps) => {
  // let campName = ownProps.match.params.name.split("-").join(" ")
  let campName = ownProps.match.params.name;
  let campaign = Object.values(state.campaigns).filter(camp => camp.name === campName)[0];
  let image = "";
  
  if (campaign){
    if (Object.keys(state.imgs).includes(campaign.cover_art_url)) {
    image = Object.values(state.imgs[campaign.cover_art_url]);
    }
  }
  
  return {
    currentUser: Object.assign({}, state.session.user, state.users[state.session.user.id]),
    campaign: campaign,
    campaigns: state.campaigns,
    characters: state.characters,
    messages: state.messages,
    cover_art: image
    
  }
};

const mDP = dispatch => ({
  fetchCampaign: campaignId => dispatch(fetchCampaign(campaignId)),
  getCharacter: characterId => dispatch(getCharacter(characterId)),
  fetchCampaignByName : campaignName => dispatch(fetchCampaignByName(campaignName)),
  fetchCampaign: campaignId => dispatch(fetchCampaign(campaignId)),
  getCampaignCharacters: (character_ids) => dispatch(getCampaignCharacters(character_ids)),
  fetchImg: (id) => dispatch(fetchImg(id)),
  fetchUser: userId => dispatch(fetchUser(userId)),
  getCampaignCharacters: (character_ids) => dispatch(getCampaignCharacters(character_ids)),
  createMessage: message => dispatch(createMessage(message)),
  openModal: (modal) => dispatch(openModal(modal))
})

export default connect(mSP, mDP)(CampaignShow);