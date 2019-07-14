import React from "react";

import CampaignMessageIndexContainer from "../messages/campaign_message_index_container.js";

class CampaignShow extends React.Component { 

  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      userChar: null,
      camp: null,
      campMsgs: [],
      campChars: [],
    }

  }
  

  componentDidMount() {
    this.props.fetchUser(this.props.currentUser.id);
    this.props.fetchCampaignByName(this.props.match.params.name);
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.campaign !== this.props.campaign) {
      // Get Campaign Characters
      this.props.getCampaignCharacters(this.props.campaign._id)
    }

    // Add Campaign Characters to state
    if (prevProps.characters !== this.props.characters) {
      const { characters, campaign, currentUser } = this.props;

      const campChars = Object.values(characters)
        .filter(char => campaign.character_ids.includes(char._id))

      this.setState({
        currentUser: this.props.currentUser,
        camp: this.props.campaign,
        campChars: campChars,
        userChar: campChars.filter(char => currentUser.character_ids.includes(char._id))[0]
      })
    }

  }

  render() {
    const { camp, currentUser, campChars, userChar } = this.state;
    // console.log(this.state);
    let campMessageIndex = <div></div>;
    if (currentUser && camp && campChars ) {
      campMessageIndex = <CampaignMessageIndexContainer 
        currentUser={currentUser} 
        campaign={camp} 
        characters={campChars}
        userChar={userChar}
      />
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
