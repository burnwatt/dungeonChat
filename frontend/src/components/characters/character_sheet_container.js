import { connect } from "react-redux";
// import {
//   fetchCampaigns,
//   fetchUserCampaigns
// } from "../../actions/campaign_actions";
import CharacterSheet from "../characters/character_sheet";
import {
  createCharacter,
  changeCharacter,
  // getCharacter
} from "../../actions/character_actions";
import { fetchCampaign } from '../../actions/campaign_actions';
import { withRouter } from "react-router-dom";
import {postImg} from '../../actions/img_actions';

const mSP = (state, ownProps) => {
  return {
    currentUser: state.session.user.id,
    
  }
};

const mDP = dispatch => ({
  createCharacter: character => dispatch(createCharacter(character)),
  changeCharacter: characterId => dispatch(changeCharacter(characterId)),
  fetchCampaign: campaignId => dispatch(fetchCampaign(campaignId)),
  postImg: (payload, type) => dispatch(postImg(payload, type))
  // getCharacter: (id) => dispatch(getCharacter(id))
});

export default withRouter(connect(
  mSP,
  mDP
)(CharacterSheet));
