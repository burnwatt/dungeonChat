import React from "react";
import { timeDiff } from "../../util/frontend_util";

class CampaignIndexItemModal extends React.Component {

  // constructor(props) {
  //   super(props);

  //   this.showCampaignModal = this.showCampaignModal.bind(this);
  // }

  render() {

    // const image = <img src={d10} alt="whatever" />;
    // const chars = `${character_ids.length}/${party_limit}`;

    // const tdiff = timeDiff(new Date, date);
    // const newHeader = (tdiff.days < 3) ? "New" : "";

    return (
      <div id="campaign-index-item-modal-container">
        <div id="campaign-index-item-modal-content">
        </div>
      </div>
    )
  }

}

export default CampaignIndexItemModal;