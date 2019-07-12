import React from "react";
import d10 from  "../../assets/public/images/d10.png";
import { timeDiff } from "../../util/frontend_util";
import { withRouter } from "react-router-dom";

class CampaignIndexItem extends React.Component {

  constructor(props) {
    super(props);

    this.sendToCampaignPage = this.sendToCampaignPage.bind(this);
  }

  sendToCampaignPage() {
    let {name} = this.props.campaign;
    name = name.split(" ").join("-");
    this.props.history.push(`/campaign/${name}`)
  }

  render() {
    const { name, cover_art_url, description, rules, 
      character_ids, user_ids, date, party_limit} = this.props.campaign;
    
    const image = <img src={ d10 } alt="whatever"/>;
    const chars = `${character_ids.length}/${party_limit}`;

    const tdiff = timeDiff(new Date, date);
    const newHeader = (tdiff.days < 3) ? "New" : "";

    return (
      <div onClick={this.sendToCampaignPage} className="campaign-index-item btn-glow">
        <div className="campaign-item-contents">
          <h2 className="campaign-item-state">{newHeader}</h2>
          { image }
          <h2 className="campaign-item-players">{chars}</h2>
        </div>
        <h1 className="campaign-item-title">{name}</h1>

      </div>
    )
  }

}

export default withRouter(CampaignIndexItem);