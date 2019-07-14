import { connect } from "react-redux";
import {
  fetchMessageCollection
} from "../../actions/message_actions";
import CampaignMessageIndex from "./campaign_message_index";

const mSP = (state, ownProps) => ({
  currentUser: ownProps.currentUser,
  campaign: ownProps.campaign,
  character: state.characters,
  messages: state.messages
});

const mDP = dispatch => ({
  fetchMessageCollection: messageIds => dispatch(fetchMessageCollection(messageIds))
});

export default connect(mSP, mDP)(CampaignMessageIndex);