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
import { withRouter } from "react-router-dom"

const mSP = (state, ownProps) => {
  return {
    currentUser: state.session.user.id,
    characters: state.characters,
  }
};

const mDP = dispatch => ({
  createCharacter: character => dispatch(createCharacter(character)),
  changeCharacter: character => dispatch(changeCharacter(character)),
  fetchCampaign: campaignId => dispatch(fetchCampaign(campaignId)),
  getCharacter: (id) => dispatch(getCharacter(id))
});

export default withRouter(connect(
  mSP,
  mDP
)(CharacterSheet));
