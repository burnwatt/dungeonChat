import React from "react";

import CampaignMessageIndexContainer from "../messages/campaign_message_index_container.js";

class CampaignShow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      messageDM: "",
      messageDescribe: "",
      messageSay: "",
      messageChat: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMessageInput = this.handleMessageInput.bind(this);

  }

  getMessageButtons() {
    const { campaign, currentUser } = this.state;
    let buttons = []

    if (campaign.created_by === currentUser._id) {
      buttons.push(
        <button key="message-btn-dm"
          className="message-btn btn-glow"
          onClick={() => this.showMessageForm("dm")}
        >DM
        </button>
      )
    }

    return buttons.concat([
      <button key="message-btn-describe"
        className="message-btn btn-glow"
        onClick={() => this.showMessageForm("describe")}
      >Describe
      </button>,
      <button key="message-btn-say"
        className="message-btn btn-glow"
        onClick={() => this.showMessageForm("say")}
      >Say
      </button>,
      <button key="message-btn-chat"
        className="message-btn btn-glow"
        onClick={() => this.showMessageForm("chat")}
      >Chat
      </button>
    ]);


  }

  handleMessageInput(which) {
    return event => this.setState({ [which]: event.target.value });
  }

  getMessageForms() {
    let { messageChat, messageSay, messageDescribe, messageDM } = this.state;
    return (
      <>
        <form id="chat" className="message-form">
          <textarea className="chat"
            // rows={`${1 + Math.floor(this.state.body.length / 125)}`}
            type="text"
            onChange={this.handleMessageInput("messageChat")}
            onKeyDown={this.onMessageEnter("messageChat")}
            value={messageChat}
            placeholder="Chat..."
          />
        </form>

        <form id="say" className="message-form">
          <textarea className="say"
            // rows={`${1 + Math.floor(this.state.body.length / 125)}`}
            type="text"
            onChange={this.handleMessageInput("messageSay")}
            onKeyDown={this.onMessageEnter("messageSay")}
            value={messageSay}
            placeholder="Say..."
          />
        </form>

        <form id="describe" className="message-form">
          <textarea className="describe"
            // rows={`${1 + Math.floor(this.state.body.length / 125)}`}
            type="text"
            onChange={this.handleMessageInput("messageDescribe")}
            onKeyDown={this.onMessageEnter("messageDescribe")}
            value={messageDescribe}
            placeholder="Describe..."
          />
        </form>

        <form id="dm" className="message-form">
          <textarea className="dm"
            // rows={`${1 + Math.floor(this.state.body.length / 125)}`}
            type="text"
            onChange={this.handleMessageInput("messageDM")}
            onKeyDown={this.onMessageEnter("messageDM")}
            value={messageDM}
            placeholder="DM..."
          />
        </form>

      </>

    )

  }

  handleSubmit(which) {
    const { currentUser, campaign, userChar } = this.state;
    let character_id = (userChar && ["messageSay", "messageDescribe"].includes(which)) ? userChar._id : null;
    let newMessage = Object.assign({
      body: this.state[which],
      user_id: currentUser._id,
      campaign_id: campaign._id,
      character_id: character_id,
      // ...( !(userChar && which === "messageSay") && { character_id: userChar._id } ),
      type: which.slice(7)
    })
    this.setState({ [which]: "" });
    console.log(newMessage);
    this.props.createMessage(newMessage);
    return event => event.prevenDefault();
  }

  onMessageEnter(which) {
    return event => {
      if (event.keyCode === 13 && event.shiftKey == false) {
        event.preventDefault();
        this.handleSubmit(which);
      }
    }
  }

  showMessageForm(which) {
    let forms = document.getElementsByClassName("message-form");
    let form = document.getElementById(which);

    if (form.style.display === "block") {
      form.style.display = "none";
      return;
    }

    for (let form of forms) {
      form.style.display = "none"
    }
    form.style.display = "block";
    form.getElementsByClassName(which)[0].focus();
    form.getElementsByClassName(which)[0].select();
  }


  render() {
      let messageButtons = this.getMessageButtons();
      let messageForms = this.getMessageForms();
      return (
        <div className="message-btns">
          {messageForms}
          {messageButtons}
        </div>
      )
    }


}

export default CampaignShow;


// console.log(this.state["messageChat"])
// let forms = ["messageChat", "messageSay", "messageDescribe", "messageDM"]
//   .map(form => {

//     const dat = this.state[form];
//     let type = form.slice(7);
//     // console.log(dat, form, type);
//     return (
//       <form id={type} className="message-form" key={`message-form-${type}`}>
//         <textarea className={type}
//           rows={`${2 + Math.floor(dat.length / 125)}`}
//           type="text"
//           onChange={this.handleMessageInput(form)}
//           onKeyDown={this.onMessageEnter(form)}
//           value={dat}
//           placeholder={`${type}...`}
//         />
//       </form>
//     )
//   })

// return (
//   <> {forms} </>
// )