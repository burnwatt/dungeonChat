import { connect } from "react-redux";
import {
  fetchCampaigns
} from "../../actions/campaign_actions";
import CampaignBrowseIndex from "./campaign_browse_index";

const mSP = state => ({
  campaigns: Object.values(state.campaigns)
});

const mDP = dispatch => ({
  fetchCampaigns: () => dispatch(fetchCampaigns())
});

export default connect(mSP, mDP)(CampaignBrowseIndex);