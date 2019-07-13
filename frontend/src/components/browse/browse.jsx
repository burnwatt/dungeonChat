import React from "react"
import CampaignBrowseContainer from "../browse/campaign_browse_container";

import landing_splash from "../../assets/public/images/landing-splash-c50.png";

class Browse extends React.Component {

  render() {
    return (
      <div id="landing">
        <div className="empty-spacer-1"></div>
        <div id="landing-hero">
          <img src={landing_splash} alt="whatever" />
        </div>
        <CampaignBrowseContainer />
      </div>
    )
  }
}

export default Browse;