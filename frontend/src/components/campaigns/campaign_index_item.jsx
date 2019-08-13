import React from "react";
import d10 from  "../../assets/public/images/d10.png";
import { timeDiff } from "../../util/frontend_util";
import { withRouter, Redirect } from "react-router-dom";

class CampaignIndexItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      avatar: ""
    }
    this.sendToCampaignPage = this.sendToCampaignPage.bind(this);
    this.stop = false;
    this.convertAvatar = false;
  }

  sendToCampaignPage() {
    const { campaign } = this.props;
    let {name} = campaign;
    this.props.history.push({
      pathname: `/campaign/${name}`
    })
  }
  componentDidMount(){
    

    // this.props.fetchImg(this.props.campaign.img_id)
    //   .then(() => {
    //     // debugger
    //     if (this.props.img.data){
    //       var base64Flag = `data:${this.props.img.contentType};base64,`;
    //     var imageStr = this.arrayBufferToBase64(this.props.img.data.data);

    //     this.setState({
    //       avatar: base64Flag + imageStr
    //     })
    //     }
    //     this.convertAvatar = true;
    //   })
    if (this.props.id === '5d2fab74e78be49a1d5c8dda') {
      // debugger
    }
    let base64Flag;
    let imageStr;
    // debugger
    if (this.state.avatar === "" && this.props.img && this.props.img.img.data) {
      base64Flag = `data:${this.props.img.contentType};base64,`;
      imageStr = this.arrayBufferToBase64(this.props.img.img.data.data);

      this.setState({
        avatar: base64Flag + imageStr
      })
      this.convertAvatar = true;
    }
  }

  componentDidUpdate(prevProps){
    let base64Flag;
    let imageStr;
    if (this.props.id === '5d2fab74e78be49a1d5c8dda') {
      // debugger
    }
    if (this.state.avatar === "" && this.props.img) {
      base64Flag = `data:${this.props.img.img.contentType};base64,`;
      imageStr = this.arrayBufferToBase64(this.props.img.img.data.data);

      this.setState({
        avatar: base64Flag + imageStr
      })
      this.convertAvatar = true;
    }
    
  }
  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };
  

  render() {
    const { name, cover_art_url, description, rules, 
      character_ids, user_ids, date, party_limit} = this.props.campaign;
      
      let image = <img src={ d10 } alt="whatever"/>;
      const chars = `${character_ids.length}/${party_limit}`;
      
      const tdiff = timeDiff(new Date, date);
      const newHeader = (tdiff.days < 3) ? "New" : "";
      
      
      if (this.props.campaign.img_id && this.convertAvatar === true) {
        image = <img src={this.state.avatar} alt="whatever" />
      }
      
       if (this.props.id === '5d2fab74e78be49a1d5c8dda') {
        //  debugger
       }

    return (
      <div onClick={this.sendToCampaignPage} className="campaign-index-item btn-glow">
        <div className="campaign-item-contents">
          <h2 className="campaign-item-state">{newHeader}</h2>
          { image }
          <h2 className="campaign-item-players">{chars}</h2>
        </div>
        <h1 className="campaign-item-title">{name}</h1>

      </div>
    )
  }

}

export default withRouter(CampaignIndexItem);