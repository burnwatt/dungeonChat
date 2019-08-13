import { connect } from "react-redux";
import {
  fetchCampaigns,
  fetchUserCampaigns,
} from "../../actions/campaign_actions";
import { fetchUser } from "../../actions/user_actions";
import CampaignIndex from "../campaigns/campaign_index";

import { openModal, closeModal } from "../../actions/ui/modal_actions";

import { fetchImg, fetchImgs } from '../../actions/img_actions';

const mSP = state => ({
  users: state.users,
  campaigns: Object.values(state.campaigns),
  currentUser: Object.assign({}, state.session.user, state.users[state.session.user.id]),
  imgs: state.imgs
});

const mDP = dispatch => ({
  fetchCampaigns: () => dispatch(fetchCampaigns()),
  fetchUser: userId => dispatch(fetchUser(userId)),
  fetchUserCampaigns: user_id => dispatch(fetchUserCampaigns(user_id)),
  openModal: (modal) => dispatch(openModal(modal)),
  closeModal: () => dispatch(closeModal()),
  fetchImg: (id) => dispatch(fetchImg(id)),
  fetchImgs: () => dispatch(fetchImgs())
});

export default connect(mSP, mDP)(CampaignIndex);