import { connect } from "react-redux";
import { 
  fetchCampaigns,
  fetchUserCampaigns,
 } from "../../actions/campaign_actions";
import Landing from "./landing";

const mSP = state => ({
  currentUser: state.session.user
});

const mDP = dispatch => ({
  fetchCampaigns: () => dispatch(fetchCampaigns()),
  fetchUserCampaigns: user_id => dispatch(fetchUserCampaigns(user_id))
});

export default connect(mSP, mDP)(Landing);