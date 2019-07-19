import React from "react";
import merge from "lodash/merge";
import { scrollTo, keyFilter } from "../../util/frontend_util";
import CampaignMessageIndexContainer from "../messages/campaign_message_index_container.js";
import CampaignCharactersContainer  from "../characters/campaign_characters_container";
import DiceBoxContainer from "../dice_box/dice_box_container";

import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:5000");


const splash_die = require("../../assets/public/images/die_glow_toomuch.png");
class CampaignShow extends React.Component {

  constructor(props) {
    super(props);
  
    this.state = {
      loaded: false,
      currentUser: null,
      userChar: null,
      campaign: null,
      campMsgs: [],
      campUsers: {},
      campChars: {},
      messageDM: "",
      messageDescribe: "",
      messageSay: "",
      messageChat: "",
      viewPorts: { Chat: true, Describe: true }
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMessageInput = this.handleMessageInput.bind(this);
    this.scribeUser = this.scribeUser.bind(this);
  }

  // newMessage() {
  //   socket.emit("newMessage");
  // }

  // ========================================================================

  handleCampaignExtraShow () {
    let nav = document.getElementById("campaign-extra");
    let icon = document.getElementById("open-campaign-extra");
    if (nav.style.width === "") {
      nav.style.width = "500px";
      // nav.style.bottom = "64px"
      icon.style.display = "none";
    }
    else {
      nav.style.width = "";
      nav.style.bottom = "";
    }
  }

  escFunction(event) {
    if (event.keyCode === 27) {
      document.getElementById("campaign-extra").style.width = "0";
      document.getElementById("open-campaign-extra").style.display = "inline-block";
    }
  }


  // ==========================================================================

  componentDidMount() {
    this.props.fetchUser(this.props.currentUser.id)
      .then(() => this.setState({currentUser: this.props.currentUser}));
    this.props.fetchCampaignByName(this.props.match.params.name)
    document.addEventListener("keydown", this.escFunction, false);

    // // Brad's images
    // if (this.props.campaign) {
    //   this.props.fetchImg(this.props.campaign.cover_art_url)
    //     .then(() => {
    //       // debugger
    //       var base64Flag = 'data:image/png;base64,';
    //       var imageStr = this.arrayBufferToBase64(this.props.cover_art[1]);

    //       this.setState({
    //         img: base64Flag + imageStr
    //       })
    //     })
    // }

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.campaign !== this.props.campaign) {
      this.setState({ campaign: this.props.campaign });

      const { campaign, currentUser } = this.props;

      this.props.getCampaignCharacters(campaign._id)
        .then(() => {
          this.setState({
            campChars: keyFilter(this.props.characters, this.props.campaign.character_ids)
          })
        })

      this.props.fetchCampaignUsers(campaign._id)
        .then(dat => {
          this.setState({
            campUsers: keyFilter(this.props.users, this.props.campaign.user_ids)
          });     
        }
        )
    }

    if (prevState.campChars !== this.state.campChars) {
      let userChar = Object.values(keyFilter(this.state.campChars, this.props.currentUser.character_ids))[0];
      if (userChar) this.setState({ userChar: userChar});
    }

    // if ((prevProps.characters !== this.props.characters)) {
    //   this.setState({
    //     campChars: keyFilter(this.props.characters, this.props.campaign.character_ids)
    //   })
    // }

    // // Brad's images
    // if (this.state.img !== prevState.img) {
    //   if (this.props.campaign) {
    //     this.props.fetchImg(this.props.campaign.cover_art_url)
    //       .then(() => {
    //         var base64Flag = 'data:image/png;base64,';
    //         var imageStr = this.arrayBufferToBase64(this.props.cover_art[1]);

    //         this.setState({
    //           img: base64Flag + imageStr
    //         })
    //       })
    //   }
    // }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
    this.props.closeModal();
  }

  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };

  // ===========================================================================

  handleDiceShow() {
    let nav = document.getElementById("dice_box_container");
    if (nav.style.height === "") {
      nav.style.height = "314px";
      // nav.style.bottom = "64px"
    }
    else {
      nav.style.height = "";
      nav.style.bottom = ""
    }
  }

  //============================================================================

  scribeUser() {

    const { currentUser, campaign } = this.state;
    let modCampaign = merge({}, campaign);
    let modUser = merge({}, currentUser);
    let updated = false;

    if (currentUser && campaign) {


      if (currentUser._id === campaign.created_by) return {msg: "A GM can't abandon their campaign!"}

      modCampaign = merge({}, campaign);
      modUser = merge({}, currentUser);
      if (
        !currentUser.campaign_ids.includes(campaign._id)
        && !campaign.user_ids.includes(currentUser._id)
      ) {
        modCampaign.user_ids.push(currentUser._id);
        modUser.campaign_ids.push(campaign._id)
        updated = true;

      } else if (
        currentUser.campaign_ids.includes(campaign._id)
        && campaign.user_ids.includes(currentUser._id)
      ) {
        modCampaign.user_ids = modCampaign.user_ids.filter(userId => userId !== currentUser._id);
        modUser.campaign_ids = modUser.campaign_ids.filter(campaignId => campaignId !== campaign._id);
        updated = true;
      }
      if (updated) {
        this.props.changeCampaign(modCampaign)
          .then(dat => {
            this.setState({ campaign: dat.campaign.data })
          });
        this.props.changeUser(modUser)
          .then(dat => {
            this.setState({ currentUser: dat.user.data })
          });
      }
    }

    
  };


  // ===========================================================================
  getMessageButtons() {
    const { campaign, currentUser, userChar } = this.state;
    let buttons = []


    if (!userChar || (campaign.created_by !== currentUser._id)) {
      let sub = (currentUser.campaign_ids.includes(campaign._id)) ? "Leave" : "Join";
      buttons.push(
        <button key="message-btn-subscribe"
          id="subscribe"
          className="message-btn btn-glow"
          onClick={this.scribeUser}
        >{sub}
        </button>
      )
    }
    
    if (campaign.created_by === currentUser._id) {
      buttons.push(
      <i id="message-btn-dice"
        onClick={() => this.showMessageForm("dm")}
        className="message-btn-icons icon-btn-red fas fa-scroll" key="message-btn-dm" />
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
      <i id="message-btn-dice" 
        onClick={this.handleDiceShow} 
        className="message-btn-icons icon-btn-red fas fa-dice-d20" key="message-btn-dice" />,
      <i id="message-btn-eye"
        onClick={() => this.props.openModal("Dice Box Modal")}
        className="message-btn-icons icon-btn-red fas fa-eye" key="message-btn-eye" />
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
            rows={`${2 + Math.floor(messageSay.length / 125)}`}
            type="text"
            onChange={this.handleMessageInput("messageSay")}
            onKeyDown={this.onMessageEnter("messageSay")}
            value={messageSay}
            placeholder="Say..."
          />
        </form>

        <form id="describe" className="message-form">
          <textarea className="describe"
            rows={`${2 + Math.floor(messageDescribe.length / 125)}`}
            type="text"
            onChange={this.handleMessageInput("messageDescribe")}
            onKeyDown={this.onMessageEnter("messageDescribe")}
            value={messageDescribe}
            placeholder="Describe..."
          />
        </form>

        <form id="dm" className="message-form">
          <textarea className="dm"
            rows={`${2 + Math.floor(messageDM.length / 125)}`}
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
    this.props.createMessage(newMessage)
      .then(() => {
        this.newMessage();
        // console.log(newMessage);
      })
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

  // ===========================================================================

  render() {
    const { campaign, currentUser, campChars, campUsers, userChar } = this.state;
    let campMessageIndex, campaignCharacters, messageButtons, messageForms, diceBoxContainer = <div></div>;
    if (Object.values(campChars).length && Object.values(campUsers).length && currentUser && campaign) {
      campMessageIndex = <CampaignMessageIndexContainer
        viewPorts={this.state.viewPorts}
        currentUser={currentUser}
        campaign={campaign}
        characters={campChars}
        userChar={userChar}
        users={campUsers}
      />

    messageButtons = this.getMessageButtons();
    messageForms = this.getMessageForms();


    diceBoxContainer = <DiceBoxContainer 
      campaign={campaign} 
      userChar={userChar}
      currentUser={currentUser}
    />
    
  }
    
    let name;
    if (campaign) {
      name = campaign.name;
      // messageButtons = this.getMessageButtons();
      // messageForms = this.getMessageForms();
    }

    let image = "#";
    if (this.state.img) {
      image = this.state.img;
    }

    return (
      <div id="campaign-show">
        <img
          src={image}
          alt='whatever'
        />
        <div id="open-campaign-extra"
          onClick={this.handleCampaignExtraShow}
          ><i className="fas fa-users" />
        </div>
        <div id="campaign-show-container">

          <div id="campaign-content">
            <h1>{name}</h1>
            <div id="campaign">
              {campMessageIndex}
            </div>

            <div id="campaign-content-footer">
              <div id="campaign-command">
                {diceBoxContainer}
                <div id="campaign-command-logo">
                  <img src={splash_die} />
                </div>
                {/* {messageForms}  */}
                <div className="message-btns">
                {/* {messageButtons} */}
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
