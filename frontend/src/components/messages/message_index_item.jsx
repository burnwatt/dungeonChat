import React from "react";

import { dateTimeStr, timeDiff } from "../../util/frontend_util";


class MessageIndexItem extends React.Component {

  buildMsg() {
      let {body, date, character_id, user_id} = this.props.message;

      switch (this.props.message.type) {

        case "Say":
          return (
            <div className="message-item message-say">
              {this.setHeader()}
              <div className="message-body">
                <p className="message-body-text">
                  {this.props.message.body}
                </p>
              </div>
            </div>
          )
        case "Chat":
          return (
            <div className="message-item message-describe">
              {this.setHeader()}
              <div className="message-body">
                <p className="message-body-text">
                  {this.props.message.body}
                </p>
              </div>
            </div>
          )
        case "DM":
          return (
            <div className="message-item">
              {this.setHeader()}
              <div className="message-body">
                <p className="message-body-text">
                  {this.props.message.body}
                </p>
              </div>
            </div>
          )
        case "Describe":
          return (
            <div className="message-item">
              {this.setHeader()}
              <div className="message-body">
                <p className="message-body-text">
                  {this.props.message.body}
                </p>
              </div>
            </div>
          )
        default:
          return null;
      }

    }

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
      // if (char === undefined) console.log(message);
      if (!char) console.log(message, char, userChar);
      return (
        <div className="left message-item-header">
          <h1 className="message-character-name">{char.char_attrs.name}</h1>
          <h3 className="message-date-time">{date}</h3>
        </div>
      )  
    }
  }

  render () {

    const { body, date, character_id, user_id, type} = this.props.message;
    if (type === "Say") {
      return (
        <div className="message-item message-say">
          {this.setHeader()}
          <div className="message-body">
            <p className="message-body-text">
              {this.props.message.body}
            </p>
          </div>
        </div>
      )
    } else if (type === "Describe") {
      return (
        <div className="message-item message-describe">
          {this.setHeader()}
          <div className="message-body">
            <p className="message-body-text">
              {this.props.message.body}
            </p>
          </div>
        </div>
      )
    } else if (type === "Chat") {
      return (
        <div className="message-item">
          {this.setHeader()}
          <div className="message-body">
            <p className="message-body-text">
              {this.props.message.body}
            </p>
          </div>
        </div>
      )
    } else if (type === "DM") {
      return (
        <div className="message-item">
          {this.setHeader()}
          <div className="message-body">
            <p className="message-body-text">
              {this.props.message.body}
            </p>
          </div>
        </div>
      )
    } else {
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






 



    // return (


      
    //   <div className="message-item">
    //     { this.setHeader() }
    //     <div className="message-body">
    //       <p className="message-body-text">
    //         {this.props.message.body}
    //       </p>
    //     </div>
    //   </div>
    // )
  }

};

export default MessageIndexItem;