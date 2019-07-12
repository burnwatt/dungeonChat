import React from "react";
import d10 from  "../../assets/public/images/d10.png";
import { timeDiff } from "../../util/frontend_util";

class CampaignIndexItem extends React.Component {

  render() {
    const { name, cover_art_url, description, rules, 
      character_ids, user_ids, date, party_limit} = this.props.campaign;
    
    const image = <img src={ d10 } alt="whatever"/>;
    const chars = `${character_ids.length}/${party_limit}`;

    const tdiff = timeDiff(new Date, date);
    const newHeader = (tdiff.days < 3) ? "New" : "";

    return (
      <div className="campaign-index-item btn-glow">
        <div className="campaign-item-contents">
          <h2 className="campaign-item-state">{newHeader}</h2>
          { image }
          <h2 className="campaign-item-players">{chars}</h2>
        </div>
        {/* <div className="campaign-item-title">
        </div> */}
        <h1 className="campaign-item-title">{name}</h1>
      </div>
    )
  }

}

export default CampaignIndexItem;