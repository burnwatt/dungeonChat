import React from "react"
import CampaignIndexContainer from "../campaigns/campaign_index_container";

import landing_splash from "../../assets/public/images/landing-splash-c50.png";

class Landing extends React.Component {

  render() {
    return (
      <div id="landing">
        <div id="landing-hero">
          <img src={ landing_splash }  />
        </div>
        <CampaignIndexContainer />
      </div>
    )
  }
}

export default Landing;