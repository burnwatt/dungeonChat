import React from "react";
import MessageIndexItem from "./message_index_item";
import { scrollTo, simpleDateSort, keyFilter } from "../../util/frontend_util";
import merge from "lodash/merge";

import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:5000");


class CampaignMessageIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = { messages: [] };

    this.onReceived();
  }

  onReceived () {
    socket.on("received", () => {
      this.props.fetchCampaignMessages(this.props.campaign._id)
    })
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

  stateFilter() {
    const { characters, campaign } = this.props;
    const { messages } = this.state;
    let activeUsers = merge(Object.values(characters)
      .map(char => char.user_id), [campaign.created_by]);

    let checks = [];
    if (!this.props.viewPorts['Chat']) checks.push('Chat')
    if (!this.props.viewPorts['Describe']) checks.push('Describe')

    return Object.values(messages)
      .sort(simpleDateSort)
      .filter(function(message) {
        return (activeUsers.includes(message.user_id) && !checks.includes(message.type))
      })
  }

  render () {
    const { characters, currentUser, users, userChar, campaign } = this.props;
    const { messages } = this.state;
    
    let msgDat = this.stateFilter();
    msgDat = Object.values(msgDat).sort(simpleDateSort)
      .map(msg => 
      <MessageIndexItem key={msg._id} 
        message={msg}
        characters={characters}
        users={users}
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