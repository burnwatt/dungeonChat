import React from "react";
import MessageIndexItem from "./message_index_item";

class CampaignMessageIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = { messages: null };
  }


  componentDidMount() {
    this.props.fetchMessageCollection(this.props.campaign.message_ids)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.campaign !== this.props.campaign) {
      this.props.fetchMessageCollection(this.props.campaign.message_ids);

      this.setState({messages: this.props.messages});
    }
  }
  
  render () {

    if (this.state.messages) {
      console.log(this.state.messages);
    }

    return (
      <div id="campaign-message-index">
        <MessageIndexItem />
        <MessageIndexItem />
        <MessageIndexItem />
        <MessageIndexItem />
        <MessageIndexItem />
        <MessageIndexItem />
        <MessageIndexItem />
        <MessageIndexItem />
        <MessageIndexItem />
        <MessageIndexItem />
      </div>
    )
  }

};

export default CampaignMessageIndex;