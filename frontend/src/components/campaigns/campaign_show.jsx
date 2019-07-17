import React from "react";
import { scrollTo } from "../../util/frontend_util";
import CampaignMessageIndexContainer from "../messages/campaign_message_index_container.js";
import CampaignCharactersContainer  from "../characters/campaign_characters_container";
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:5000");

// Assets...
const splash_die = require("../../assets/public/images/die_glow_toomuch.png");
const fade_in_command = require("../../assets/public/images/components/fade-in-command.png");

class CampaignShow extends React.Component {

  constructor(props) {
    super(props);
  
    this.state = {
      loaded: false,
      currentUser: null,
      userChar: null,
      campaign: null,
      campMsgs: [],
      campChars: [],
      messageDM: "",
      messageDescribe: "",
      messageSay: "",
      messageChat: ""
    }


    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMessageInput = this.handleMessageInput.bind(this);

  }

  newMessage() {
    socket.emit("newMessage");
  }

  componentDidMount() {
    this.props.fetchUser(this.props.currentUser.id)
      .then(() => this.setState({currentUser: this.props.currentUser}));
      
    this.props.fetchCampaignByName(this.props.match.params.name)
      .then(dat => {
        this.setState({campaign: dat.campaign.data})
        this.props.getCampaignCharacters(dat.campaign.data._id)
          .then(dat => {
            this.setState({campChars: dat.characters.data});

          })
      });

      // INCOMING CHANGES
    if (this.props.campaign) {
      this.props.fetchImg(this.props.campaign.cover_art_url)
        .then(() => {
          // debugger
          var base64Flag = 'data:image/png;base64,';
          var imageStr = this.arrayBufferToBase64(this.props.cover_art[1]);

          this.setState({
            img: base64Flag + imageStr
          })
        })
    }

  }

  
    
    
      


  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };

  
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.campaign !== this.props.campaign) {
          this.setState({campaign: this.props.campaign });
          
    if (this.state.img !== prevState.img) {
      if (this.props.campaign) {
        this.props.fetchImg(this.props.campaign.cover_art_url)
          .then(() => {
            var base64Flag = 'data:image/png;base64,';
            var imageStr = this.arrayBufferToBase64(this.props.cover_art[1]);

            this.setState({
              img: base64Flag + imageStr
            })
          })
      }
    }
    // POSSIBLE MERGE CONFLICT
    // if (this.props.campaign && prevProps.campaign){
    //   if (prevProps.campaign._id !== this.props.campaign._id) {
    // // if (prevState.campChars !== this.state.campChars) {

    //   // Get Campaign Characters
    //   this.props.fetchCampaignByName(this.props.match.params.name);
    //   // this.props.getCampaignCharacters(this.props.campaign._id)
      
    //   }
    // }
    

    
    }

    if (prevProps.characters !== this.props.characters) {
      let {character_ids} = this.props.campaign;
      let {characters} = this.props;

      this.setState({
        campChars: Object.values(characters)
          .filter(char => character_ids.includes(char._id))
      })

      if (this.state.currentUser) {
        const { campaign, currentUser } = this.state;
        let inter = campaign.character_ids
          .filter(id => currentUser.character_ids.includes(id));
        if (inter.length) this.setState({
          userChar: Object.values(this.props.characters)
            .filter(char => char._id === inter[0])[0]
        })
      }

    }

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
      </button>,
      <button key="message-btn-dice"
        className="message-btn btn-glow"
        onClick={() => this.props.openModal("Dice Box Modal")} 
      >Dice Icon
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
            rows={`${2 + Math.floor(messageChat.length / 125)}`}
            type="text"
            onChange={this.handleMessageInput("messageChat")}
            onKeyDown={this.onMessageEnter("messageChat")}
            value={messageChat}
            placeholder="Chat..."
          />
        </form>

        <form id="say" className="message-form">
          <textarea className="say"
            rows={`${2 + Math.floor(messageChat.length / 125)}`}
            type="text"
            onChange={this.handleMessageInput("messageSay")}
            onKeyDown={this.onMessageEnter("messageSay")}
            value={messageSay}
            placeholder="Say..."
          />
        </form>

        <form id="describe" className="message-form">
          <textarea className="describe"
            rows={`${2 + Math.floor(messageChat.length / 125)}`}
            type="text"
            onChange={this.handleMessageInput("messageDescribe")}
            onKeyDown={this.onMessageEnter("messageDescribe")}
            value={messageDescribe}
            placeholder="Describe..."
          />
        </form>

        <form id="dm" className="message-form">
          <textarea className="dm"
            rows={`${2 + Math.floor(messageChat.length / 125)}`}
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
    // console.log(newMessage);
    this.props.createMessage(newMessage)
      .then(() => this.newMessage())
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
    const { campaign, currentUser, campChars, userChar } = this.state;
    let campMessageIndex, campaignCharacters, messageButtons, messageForms = <div></div>;
    
    if (campChars && Object.keys(campChars).length && currentUser && campaign) {
      campMessageIndex = <CampaignMessageIndexContainer
        currentUser={currentUser}
        campaign={campaign}
        characters={campChars}
        userChar={userChar}
      />

    messageButtons = this.getMessageButtons();
    messageForms = this.getMessageForms();
    }

    let image = "#";
    if (this.state.img) {
      image = this.state.img;
    }


return (
  <div id="campaign-show">
     <img
      src={image}
      alt='whatever' />
        <div id="campaign-show-container">

          <div id="campaign-content">
            <h1>Campaign Name</h1>
            <div id="campaign">
              {campMessageIndex}
            </div>

            <div id="campaign-content-footer">
              {/* <h1>Command Content Here</h1> */}
              <div id="campaign-command">
                <img id="command-background" src={fade_in_command}/>
                <div id="campaign-command-logo">
                  <img src={splash_die} />
                </div>
                {messageForms} 
                <div className="message-btns">
                  {messageButtons}
                </div>
              </div>
            </div>

          </div>

          <div id="campaign-extra">
            {/* <h1>Extra Chat Content Here?</h1> */}
            <div id="campaign-extra-content">
              <CampaignCharactersContainer
                currentUser={currentUser}
                campaign={campaign}
                characters={campChars}
                userChar={userChar}
              />
            </div>
          </div>

        </div>
      </div>

    )
  }

}

export default CampaignShow;
