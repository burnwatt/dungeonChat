import { connect } from 'react-redux';
// import {  } from "../../actions/campaign_actions";
import DiceBox from './dice_box';

// import { openModal } from "../../actions/ui/modal_actions";

const mSP = (state) => {
  return {
    currentUser: state.session.user,
    // newTweet: state.tweets.new
  };
};

const mDP = dispatch => {
  return {
    // openModal: (modal) => dispatch(openModal(modal))
  };
};

export default connect(mSP, mDP)(DiceBox);