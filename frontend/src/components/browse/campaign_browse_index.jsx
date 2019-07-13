import React from "react";
import CampaignIndexItem from "../campaigns/campaign_index_item";
import "../../util/util";

class CampaignBrowseIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campaigns: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    this.props.fetchCampaigns();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.campaigns !== this.props.campaigns) {
      const { campaigns } = this.props;
      this.setState({ campaigns: campaigns })
    }
  }

  
  getCampaignDat() {
    const { campaigns } = this.state;
    let campDat = campaigns.map(camp => <CampaignIndexItem key={camp._id} campaign={camp} currentUser={this.props.currentUser} />);
    return campDat;
  }



  render() {
    const campDat = this.getCampaignDat();

    return (
      <div id="campaigns-content">
        <input type="text" className="search-bar" placeholder="Find a campaign" />
        <nav className="campaigns-index-controller">
          <button id="cnb-last"
            className="campaign-nav-button btn-glow"
          >+ New Campaign
          </button>
        </nav>
        <div id="campaign-index">
          {campDat}
        </div>
      </div>
    )
  }
}

export default CampaignBrowseIndex;