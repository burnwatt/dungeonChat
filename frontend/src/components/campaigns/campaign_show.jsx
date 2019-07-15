import React from "react";


class CampaignShow extends React.Component { 
  constructor(props) {
    super(props);
    this.state = { 
      img: "",
      render: false
     }
  }

  componentDidMount() {
    debugger
    this.props.fetchImg(this.props.campaign.cover_art_url)
      .then(() => {
        debugger
        var base64Flag = 'data:image/png;base64,';
        var imageStr = this.arrayBufferToBase64(this.props.cover_art[1]);

        this.setState({
          img: base64Flag + imageStr
        })
      })
  }

  componentDidUpdate(prevProps, prevState){
    // debugger
    if (this.state.img !== prevState.img ){
      this.setState({render: true})
    }
  }

  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };

  render() {
    debugger
    let image = "#";
    if (this.state.img) {
      image = this.state.img;
    }

    return (
      <div id="campaign-show">
        <img
          src={image}
          alt='whatever' />
        <div id="campaign-show-nav-spacer1"></div>
        <h1>Campaign Name</h1>
        <br />
        <div id="chat-box-container">We will likely have the chat box render here, though everything would be styled</div>
      </div>

    )
  }

}

export default CampaignShow;
