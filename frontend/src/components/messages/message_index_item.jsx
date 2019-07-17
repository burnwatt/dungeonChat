import React from "react";

import { dateTimeStr, timeDiff } from "../../util/frontend_util";


class MessageIndexItem extends React.Component {

  setHeader(side) {
    const { userChar, characters, message, currentUser, users } = this.props;
    let { type, user_id, character_id, date } = this.props.message;


    date = dateTimeStr(date);
    date = (timeDiff(new Date(), message.date).days >= 1) ? date[0] : date[1];

    let name;
    if (type === "DM" || type === "Dice") {
      return (
        <div className="left message-item-header">
          <h3 className="message-date-time">{date}</h3>
        </div>
      )
    } else switch (type) {

      case "Chat":
        name = (user_id === currentUser._id) ? currentUser.handle : users[user_id].handle
        return (
          <div className={`${side} message-item-header`}>
            <h1 className="message-character-name">{name}</h1>
            <h3 className="message-date-time">{date}</h3>
          </div>
        )

      default:
        name = (user_id === currentUser._id) ? userChar.char_attrs.name : characters[character_id].char_attrs.name
        return (
          <div className={`${side} message-item-header`}>
            <h1 className="message-character-name">{name}</h1>
            <h3 className="message-date-time">{date}</h3>
          </div>
        )
    }

  }

  render () {

    const { body, type, user_id, character_id, } = this.props.message;
    const { users, currentUser } = this.props;


    // const className = `message-item message-${type.toLowerCase()}`
    // return (
    //   <div className={className}>
    //     {this.setHeader(type)}
    //     <div className="message-body">
    //       <p className="message-body-text">
    //         {body}
    //       </p>
    //     </div>
    //   </div>
    // )
    let side = (currentUser._id === user_id) ? "right" : "left";
    if (type === "Say") {
      return (
        <div className="message-item message-say">
          {this.setHeader(side)}
          <div className="message-body">
            <p className="message-body-text">
              {body}
            </p>
          </div>
        </div>
      )
    } else if (type === "Describe") {
      return (
        <div className="message-item message-describe">
          {this.setHeader(side)}
          <div className="message-body">
            <p className="message-body-text">
              {body}
            </p>
          </div>
        </div>
      )
    } else if (type === "Chat") {
      return (
        <div className="message-item message-chat">
          {this.setHeader(side)}
          <div className={`message-body ${side}-body`}>
            <p className="message-body-text">
              {body}
            </p>
          </div>
        </div>
      )
    } else if (type === "DM") {
      return (
        <div className="message-item message-describe">
          {this.setHeader(side)}
          <div className="message-body">
            <p className="message-body-text">
              {body}
            </p>
          </div>
        </div>
      )
    } else if (type === "Dice") {
      return (
        <div className="message-item message-dice">
          {this.setHeader()}
          <div className="message-body">
            <p className="message-body-text">
              {body}
            </p>
          </div>
        </div>
      )
    } else {
      return (
        <div className="message-item">
          {/* { this.setHeader() } */}
          <div className="message-body">
            <p className="message-body-text">
              {body}
            </p>
          </div>
        </div>
      )
    }

  }

};

export default MessageIndexItem;