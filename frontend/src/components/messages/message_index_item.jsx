import React from "react";

import { dateTimeStr, timeDiff } from "../../util/frontend_util";


class MessageIndexItem extends React.Component {

  // getSay() {
  
  //   return (
  //     <div className="message-item">
  //       <div className="message-item-header">
  //         <div className="message-date-time">
  //           <h3 className="message-date">{date[0]}</h3>
  //           <h3 className="message-time">{date[1]}</h3>
  //         </div>
  //       </div>
  //       <div className="message-body">
  //         <p className="message-body-text">
  //           {this.props.message.body}
  //         </p>
  //       </div>
  //     </div>
  //   )
  // }

  setHeader() {
    const { userChar, characters, message } = this.props;

    let date = message.date;
    date = dateTimeStr(date);
    date = (timeDiff(new Date(), message.date).days >= 1) ? date[0] : date[1];
    if ( userChar && message.character_id === userChar._id ) {
      let name = userChar.char_attrs.name;
      return (
        <div className="right message-item-header">
          <h1 className="message-character-name">{name}</h1>
          <h3 className="message-date-time">{date}</h3>
        </div>
      )
    } else if (message.character_id) {
      let char = Object.values(characters).filter(char => char._id === message.character_id)[0];
      return (
        <div className="left message-item-header">
          <h1 className="message-character-name">{char.char_attrs.name}</h1>
          <h3 className="message-date-time">{date}</h3>
        </div>
      )  
    }
  }

  render () {

    let { body, date, character_id, user_id } = this.props.message;
    return (
      <div className="message-item">
        { this.setHeader() }
        <div className="message-body">
          <p className="message-body-text">
            {this.props.message.body}
          </p>
        </div>
      </div>
    )
  }

};

export default MessageIndexItem;