import React from "react"
import CampaignIndexContainer from "../campaigns/campaign_index_container";

import "./landing.css";

class Landing extends React.Component {

  render() {
    return (
      <div id="landing">
        <nav id="temp-header">
          <div className="header-content-left"></div>
          {/* This is a nav bar! */}
          <div className="header-content-right"></div>
        </nav>
        <div id="landing-hero">
        </div>
        <div id="games-content">
          <div id="search-bar"></div>
          <div id="games-index?"></div>
        </div>
        {/* <CampaignIndexContainer /> */}
      </div>
    )
  }
}

export default Landing;