import React from "react";
import MessageIndexItem from "./message_index_item";
import { scrollTo } from "../../util/frontend_util";

class CampaignMessageIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = { messages: [] };
  }

  componentDidMount() {
    this.props.fetchCampaignMessages(this.props.campaign._id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.messages !== this.props.messages) {
      this.setState({ messages: this.props.messages })
    }
    scrollTo("campaign-message-index-bottom")
  }

  render () {
    const { characters, currentUser, userChar } = this.props;
    const { messages } = this.state;
    
    let msgDat = Object.values(messages).map(msg => 
      <MessageIndexItem key={msg._id} 
        message={msg}
        characters={characters}
        userChar={userChar}
        currentUser={currentUser}
      />)

    return (
      <div id="campaign-message-index">
        { msgDat }
        <div id="campaign-message-index-bottom" />
      </div>
    )
  }

};

export default CampaignMessageIndex;