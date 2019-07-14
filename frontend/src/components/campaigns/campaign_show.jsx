import React from "react";

import CampaignMessageIndexContainer from "../messages/campaign_message_index_container.js";

class CampaignShow extends React.Component { 

  constructor(props) {
    super(props);
  }
  

  componentDidMount() {
    this.props.fetchUser(this.props.currentUser.id);
    this.props.fetchCampaignByName(this.props.match.params.name);
  }

  render() {
    const { campaign, currentUser } = this.props;
    let campMessageIndex = <div></div>;
    if (campaign && currentUser ) {
      campMessageIndex = <CampaignMessageIndexContainer currentUser={currentUser} campaign={campaign} />
    }

    return (
      <div id="campaign-show">
        <div id="campaign-show-container">

          <div id="campaign-content">
            <h1>Campaign Name</h1>
            <div id="campaign">
              { campMessageIndex }
            </div>
            

            <div id="campaign-content-footer">
              <h1>Command Content Here</h1>
              <div id="campaign-command">
              </div>
            </div>

          </div>

          <div id="campaign-extra">
            <h1>Extra Chat Content Here?</h1>
            <div id="campaign-extra-content">
            </div>
          </div>

        </div>
      </div>
    )
  }

}

export default CampaignShow;
