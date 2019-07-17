import { connect } from "react-redux";


import CampaignIndexItem from "../campaigns/campaign_index_item";


const mSP = state => {
  let image = "";
  image = Object.values(state.imgs)[0];
  return {
  img: image
  }
};



export default connect(mSP, null)(CampaignIndexItem);