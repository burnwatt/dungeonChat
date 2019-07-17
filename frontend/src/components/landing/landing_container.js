import { connect } from "react-redux";
import { 
  fetchCampaigns,
  fetchUserCampaigns,
 } from "../../actions/campaign_actions";
import Landing from "./landing";

import { postImg, fetchImg } from '../../actions/img_actions';

const mSP = state => ({
  currentUser: state.session.user
});

const mDP = dispatch => ({
  fetchCampaigns: () => dispatch(fetchCampaigns()),
  fetchUserCampaigns: user_id => dispatch(fetchUserCampaigns(user_id)),
  postImg: (payload, type) => dispatch(postImg(payload, type)),
  fetchImg: (id) => dispatch(fetchImg(id))
});

export default connect(mSP, mDP)(Landing);