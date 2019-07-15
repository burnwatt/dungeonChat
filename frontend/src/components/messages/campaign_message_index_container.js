import { connect } from "react-redux";
import {
  fetchCampaignMessages,
  fetchMessages
} from "../../actions/message_actions";
import CampaignMessageIndex from "./campaign_message_index";

const mSP = (state, ownProps) => ({
  campaign: ownProps.campaign,
  currentUser: ownProps.currentUser,
  characters: state.characters,
  messages: state.messages
});

const mDP = dispatch => ({
  fetchCampaignMessages: messageIds => dispatch(fetchCampaignMessages(messageIds)),
  fetchMessages: () => dispatch(fetchMessages())
});

export default connect(mSP, mDP)(CampaignMessageIndex);