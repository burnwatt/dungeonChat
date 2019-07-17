import { connect } from "react-redux";
// import {
//   fetchCampaigns,
//   fetchUserCampaigns
// } from "../../actions/campaign_actions";
import CharacterSheet from "../characters/character_sheet";
import {
  createCharacter,
  changeCharacter,
  getCharacter
} from "../../actions/character_actions"
import { fetchCampaign } from '../../actions/campaign_actions';
import { withRouter } from "react-router-dom";
import {postImg, fetchImg} from '../../actions/img_actions';

const mSP = (state, ownProps) => {
  
  let image = "";
  image = Object.values(state.imgs)[0];
  return {
    currentUser: state.session.user.id,
    characters: state.characters,
    img: image
  }
};

const mDP = dispatch => ({
  createCharacter: character => dispatch(createCharacter(character)),
  changeCharacter: character => dispatch(changeCharacter(character)),
  fetchCampaign: campaignId => dispatch(fetchCampaign(campaignId)),
  getCharacter: (id) => dispatch(getCharacter(id)),
  postImg: (payload, type) => dispatch(postImg(payload, type)),
  fetchImg: (id) => dispatch(fetchImg(id))
});

export default withRouter(connect(
  mSP,
  mDP
)(CharacterSheet));
