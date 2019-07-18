import { connect } from 'react-redux';
import { fetchCampaign, fetchCampaignByName, changeCampaign } from "../../actions/campaign_actions";
import { fetchImg } from "../../actions/img_actions";
import { createMessage } from "../../actions/message_actions";
import { fetchUser, fetchCampaignUsers, changeUser } from "../../actions/user_actions";
import { getCampaignCharacters, getCharacter } from "../../actions/character_actions";
import CampaignShow from './campaign_show';
import { openModal, closeModal } from "../../actions/ui/modal_actions";


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
    users: state.users,
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
  fetchCampaignUsers: campaignId => dispatch(fetchCampaignUsers(campaignId)),
  createMessage: message => dispatch(createMessage(message)),
  openModal: (modal) => dispatch(openModal(modal)),
  closeModal: () => dispatch(closeModal()), 
  changeCampaign: (campaign) => dispatch(changeCampaign(campaign)),
  changeUser: user => dispatch(changeUser(user))
})

export default connect(mSP, mDP)(CampaignShow);