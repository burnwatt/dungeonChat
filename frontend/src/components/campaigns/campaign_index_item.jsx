import React from "react";
import d10 from  "../../assets/public/images/d10.png";

class CampaignIndexItem extends React.Component {

  render() {

    const image = <img src={ d10 }/>;

    return (
      <div className="campaign-index-item btn-glow">
        <div className="campaign-item-contents">
          <h2 className="campaign-item-state">New</h2>
          { image }
          <h2 className="campaign-item-players">1/2</h2>
        </div>
        {/* <div className="campaign-item-title">
        </div> */}
        <h1 className="campaign-item-title">Title</h1>
      </div>
    )
  }

}

export default CampaignIndexItem;