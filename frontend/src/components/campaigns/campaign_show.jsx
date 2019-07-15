import React from "react";

import CampaignMessageIndexContainer from "../messages/campaign_message_index_container.js";
import CampaignCharactersContainer  from "../characters/campaign_characters_container";

class CampaignShow extends React.Component { 

  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      userChar: null,
      camp: null,
      campMsgs: [],
      campChars: [],
      messageSay: "",
      messageChat: "",
      messageDescribe: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);

  }
  

  componentDidMount() {
    this.props.fetchUser(this.props.currentUser.id);
    this.props.fetchCampaignByName(this.props.match.params.name);
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.campaign !== this.props.campaign) {
      // Get Campaign Characters
      this.props.fetchCampaignByName(this.props.match.params.name);
      
    }

    if (this.props.campaign) {
      this.props.getCampaignCharacters(this.props.campaign._id)
    }

    // Add Campaign Characters to state
    if (prevProps.characters !== this.props.characters) {
      const { characters, campaign, currentUser } = this.props;

      const campChars = Object.values(characters)
        .filter(char => campaign.character_ids.includes(char._id))

      this.setState({
        currentUser: this.props.currentUser,
        camp: this.props.campaign,
        campChars: campChars,
        userChar: campChars.filter(char => currentUser.character_ids.includes(char._id))[0]
      })
    }

  }

  getMessageButtons() {
    const { camp, currentUser } = this.state;
    let buttons = []

    if (camp.created_by === currentUser._id) {
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

  getMessageForms() {

    return (
      <>
        <form id="chat" className="message-form">
          <textarea className="chat"
            // rows={`${1 + Math.floor(this.state.body.length / 125)}`}
            type="text"
            // onChange={this.handleInput("body")}
            // onKeyDown={this.onEnterPress}
            value={this.state.body}
            placeholder="Chat..."
          />
        </form>

        <form id="say" className="message-form">
          <textarea className="say"
            // rows={`${1 + Math.floor(this.state.body.length / 125)}`}
            type="text"
            // onChange={this.handleInput("body")}
            // onKeyDown={this.onEnterPress}
            value={this.state.body}
            placeholder="Say..."
          />
        </form>

        <form id="describe" className="message-form">
          <textarea className="describe"
            // rows={`${1 + Math.floor(this.state.body.length / 125)}`}
            type="text"
            // onChange={this.handleInput("body")}
            // onKeyDown={this.onEnterPress}
            value={this.state.body}
            placeholder="Describe..."
          />
        </form>

        <form id="dm" className="message-form">
          <textarea className="dm"
            // rows={`${1 + Math.floor(this.state.body.length / 125)}`}
            type="text"
            // onChange={this.handleInput("body")}
            onKeyDown={this.onMessageEnter}
            value={this.state.body}
            placeholder="DM..."
          />
        </form>

      </>

    )

  }

  handleSubmit(event, which) {
    event.preventDefault();
    // return event => {
    //   console.log("hellothere")
    // }
  }

  onMessageEnter(event) {
    if (event.keyCode == 13 && event.shiftKey == false) {
      console.log("hello")
      this.handleSubmit(event);
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
    form.style.display="block";
    form.getElementsByClassName(which)[0].focus();
    form.getElementsByClassName(which)[0].select();
    // form.textarea.focus();
    // form.textarea.select();

  }


  render() {
    const { camp, currentUser, campChars, userChar } = this.state;

    let campMessageIndex, campaignCharacters, messageButtons, messageForms = <div></div>;
    if (currentUser && camp && campChars ) {
      campMessageIndex = <CampaignMessageIndexContainer 
        currentUser={currentUser} 
        campaign={camp} 
        characters={campChars}
        userChar={userChar}
      />

      campaignCharacters = <CampaignCharactersContainer
        currentUser={currentUser}
        campaign={camp}
        characters={campChars}
        userChar={userChar}
      />

      messageButtons = this.getMessageButtons();
      messageForms = this.getMessageForms();
    }


    return (
      <div id="campaign-show">
        <div id="campaign-show-container">

          <div id="campaign-content">
            <h1>Campaign Name</h1>
            <div id="campaign">
              { campMessageIndex }
            </div>
            
            <div id="campaign-content-footer">
              {/* <h1>Command Content Here</h1> */}
              <div id="campaign-command">

                { messageForms }

                <div className="message-btns">
                  { messageButtons }
                </div>
              </div>
            </div>

          </div>

          <div id="campaign-extra">
            {/* <h1>Extra Chat Content Here?</h1> */}
            <div id="campaign-extra-content">
              {campaignCharacters}
            </div>
          </div>

        </div>
      </div>
    )
  }

}

export default CampaignShow;
