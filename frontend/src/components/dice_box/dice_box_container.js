import { connect } from 'react-redux';
// import {  } from "../../actions/campaign_actions";
import DiceBox from './dice_box';

import { openModal, closeModal } from "../../actions/ui/modal_actions";
import { createMessage } from "../../actions/message_actions";

// const mSP = (state, ownProps) => {
//   return {
//     // currentUser: ownProps.currentUser,
//     // newTweet: state.tweets.new
//   };
// };

const mDP = dispatch => {
  return {
    createMessage: (diceRollMessage) => dispatch(createMessage(diceRollMessage)),
    openModal: (modal) => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(null, mDP)(DiceBox);