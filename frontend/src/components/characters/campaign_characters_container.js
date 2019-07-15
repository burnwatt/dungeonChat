import {connect} from "react-redux";
import CampaignCharacters from './campaign_characters';
import { fetchUser } from "../../actions/user_actions";
import { getCampaignCharacters } from "../../actions/character_actions";

const msp = (state,ownProps) => ({
    campaign: ownProps.campaign,
    currentUser: ownProps.currentUser,
    characters: state.characters
});

const mdp = dispatch => ({
    fetchUser: userId => dispatch(fetchUser(userId)),
    getCampaignCharacters: character_ids => dispatch(getCampaignCharacters(character_ids))
});

export default connect(msp,mdp)(CampaignCharacters);