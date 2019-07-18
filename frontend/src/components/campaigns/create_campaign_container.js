import { connect } from 'react-redux';
import { createCampaign } from "../../actions/campaign_actions";
import CampaignForm from './campaign_form';
import { closeModal } from '../../actions/ui/modal_actions';

import { postImg } from '../../actions/img_actions';

const mSP = (state) => {
  return {
    currentUser: state.session.user,
    // newTweet: state.tweets.new
  };
};

const mDP = dispatch => {
  return {
    createCampaign: data => dispatch(createCampaign(data)),
    closeModal: () => dispatch(closeModal()),
    postImg: (payload, type) => dispatch(postImg(payload, type))
  };
};

export default connect(mSP, mDP)(CampaignForm);