import React from "react";
import CampaignIndexItem from "./campaign_index_item";
import "../../util/util";

class CampaignIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      whichCampaigns: "campaigns",
      campaigns: [],
      myCampaigns: [],
      isLoaded: false,
   };

   this.setCampaignDisplay = this.setCampaignDisplay.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.currentUser.id);
    this.props.fetchCampaigns();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.campaigns !== this.props.campaigns) {
      const { campaigns, currentUser } = this.props;
      let myCampaigns = [];
      if (campaigns.length && currentUser.campaign_ids) {
        myCampaigns = campaigns.filter(camp => currentUser.campaign_ids.includes(camp._id));
      }
      this.setState({ campaigns: campaigns, myCampaigns: myCampaigns })
    }
  }

  setCampaignDisplay(btnId) {
    let tabs = document.getElementsByClassName("campaigns-select-btn");
    let tab = document.getElementById(btnId);

    if (btnId === "campaigns-btn" && this.state.whichCampaigns !== "campaigns") {
      this.setState({whichCampaigns: "campaigns"});
    } else if (btnId === "myCampaigns-btn" && this.state.whichCampaigns !== "myCampaigns") {
      this.setState({ whichCampaigns: "myCampaigns" });
    }

    for (let tab of tabs) {
      tab.classList.remove("campaigns-btn-selected");
    }
    tab.classList.add("campaigns-btn-selected")
  }
  getCampaignDat() {
    const { campaigns, myCampaigns } = this.state;
    let campDat;
    if (this.state.whichCampaigns === "campaigns") {
      campDat = campaigns.map(camp => <CampaignIndexItem key={camp._id} campaign={camp} currentUser={this.props.currentUser}/>);
    } else if (this.state.whichCampaigns === "myCampaigns") {
      campDat = myCampaigns.map(camp => <CampaignIndexItem key={camp._id} campaign={camp} />)
    }
    return campDat;
  }



  render() {
    const campDat = this.getCampaignDat();

    return (
      <div id="campaigns-content">
        <input type="text" className="search-bar" placeholder="Find a campaign" />
        <nav className="campaigns-index-controller">
          <div className="campaign-btns">
            <button onClick={() => this.setCampaignDisplay("campaigns-btn")} 
              id="campaigns-btn" 
              className="campaigns-select-btn campaigns-btn-selected campaign-nav-button btn-glow"
              >Campaigns
            </button>
            <button onClick={() => this.setCampaignDisplay("myCampaigns-btn")} 
              id="myCampaigns-btn" 
              className="campaigns-select-btn campaign-nav-button btn-glow"
              >My Campaigns
            </button>
          </div>
          <button id="cnb-last" 
            className="campaign-nav-button btn-glow"
            >+ New Campaign
          </button>
        </nav>
        <div id="campaign-index">
          { campDat }
        </div>
      </div>
    )
  }
}

export default CampaignIndex;