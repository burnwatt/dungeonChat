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
} from "../../actions/character_actions"
import { withRouter } from "react-router-dom"

const mSP = (state) => {
  return {
    currentUser: state.session.user,
  }
};

const mDP = dispatch => ({
  createCharacter: (character) => dispatch(createCharacter(character)),
  changeCharacter: (id) => dispatch(changeCharacter(id))
  // getCharacter: (id) => dispatch(getCharacter(id))
});

export default withRouter(connect(
  mSP,
  mDP
)(CharacterSheet));
