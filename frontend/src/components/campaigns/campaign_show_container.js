import { connect } from 'react-redux';
import { fetchCampaign } from "../../actions/campaign_actions";
import {
  fetchImg
} from "../../actions/img_actions";
import { getCampaignCharacters } from "../../actions/character_actions";
import CampaignShow from './campaign_show';

const mSP = (state, ownProps) => {
  let name = ownProps.match.params.name.split("-").join(" ")
  let image = "";
  let theCamp = Object.values(state.campaigns).filter(camp => camp.name === name)[0];
  debugger
  
  if (theCamp){
    if (Object.keys(state.imgs).includes(theCamp.cover_art_url)) {
    image = Object.values(state.imgs[theCamp.cover_art_url]);
    }
  }
  
  return{
  currentUser: ownProps.currentUser,
  campaign: theCamp,
  characters: state.characters,
  cover_art: image
  // messages: state.messages,
}};

const mDP = (dispatch, ownProps) => {
  return{
  fetchCampaign: campaignId => dispatch(fetchCampaign(campaignId)),
  getCampaignCharacters: (character_ids) => dispatch(getCampaignCharacters(character_ids)),
  fetchImg: (id) => dispatch(fetchImg(id))
}}

export default connect(mSP, mDP)(CampaignShow);