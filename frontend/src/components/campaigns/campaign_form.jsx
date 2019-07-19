import React from 'react';

class CampaignForm extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      cover_art_url: "",
      password: "",
      name: "",
      description: "",
      rules: "",
      is_private: false,
      file: "" 

    } 

    this.makePrivate = this.makePrivate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.picture = "";
  }


  handleSubmit(e) {
    e.preventDefault();
    let campaign = {
      cover_art_url: this.state.cover_art_url,
      password: this.state.password,
      name: this.state.name,
      description: this.state.description,
      rules: this.state.rules,
      is_private: this.state.is_private
    };
    
    this.props.createCampaign(campaign)
      .then(action => {
        // debugger 
        const picture = this.picture;
        let formData = new FormData();
        formData.append("picture", picture);
        formData.append("campaign_id", action.campaign.data._id);
        formData.append("contentType", picture.type);

        this.props.postImg(formData, "camp");
        return "";
      });
    // this.setState({ name: '' }) This isn't complete but feel like there
    // Should be some local state clearing functionality upon submission
    this.props.closeModal();
  }

  handleInput(field) {
    return event => this.setState({ [field]: event.target.value });
  }

  makePrivate(event) {
    event.preventDefault();
    
    this.setState({ is_private: true})

  }

  handleChangeImg(e) {
    e.preventDefault()
    this.picture = e.target.files[0];
  }

  render() {
   
    // let image = this.state.cover_art_url ? <img id="campaign-cover-art" src="#" alt="whatever"/> : <div></div> ;
    let isFileUploaded;
    
    let thePath;
    
    
    let image = this.state.file ? <img id="campaign-cover-art" src={this.state.file} alt="whatever" /> : <div></div>;
      if (document.getElementById("campaign-cover-art-container")){
        isFileUploaded = document.getElementById("campaign-cover-art-container").files
      }
    
    if (isFileUploaded) {
      thePath = document.getElementById("campaign-cover-art-container").files[0].path
      image = <img id="campaign-cover-art" src={thePath} alt="whatever"/>;
      
    }
    
    
    return (

      <div className="campaign_form_container">

        <form className="campaign-form " onSubmit={this.handleSubmit}>
          <h1>Create Campaign</h1>
          <input
            id="file"
            type="file"
            name="picture"
            accept="application/x-zip-compressed,image/*"
            onChange={this.handleChangeImg.bind(this)}></input>
          <div id="campaign-cover-art-container">
            {image}
          </div>
          <br />

          <div className="name-flex-container">
            <div className="icon-div">
              <div><i className="fas fa-dragon"></i></div>
            </div>
            <input className="campaign-name-input"
              type="text"
              value={this.state.name}
              onChange={this.handleInput("name")}
              placeholder="Enter a Campaign Name"
            />
          </div>
          <br />

          <div className="description-flex-container">
            <div className="icon-div">
              <div><i className="fas fa-pencil-alt"></i></div>
            </div>
            <input className="campaign-description-input"
              type="text"
              value={this.state.description}
              onChange={this.handleInput("description")}
              placeholder="Game description. Can be changed at any point."
            />
          </div>
          <br />

          <div className="rules-flex-container"> 
            <div className="icon-div">
              <div><i className="fas fa-pencil-alt"></i></div>
            </div>
            <input className="campaign-rules-input"
              type="text"
              value={this.state.rules}
              onChange={this.handleInput("rules")}
              placeholder="Enter game rules if you would like"
            />
          </div>
          <br />

          <div className="password-flex-container">
            <div className="icon-div">
              <div><i className="fas fa-lock"></i></div>
            </div>
            <input className="campaign-password-input"
              type="text"
              value={this.state.password}
              onChange={this.handleInput("password")}
              placeholder="(Optional Password)"
            />
          </div>
          <br />

          <button className="make-private-button btn-glow" onClick={this.makePrivate}>Make this campaign private</button>

          <br />
          <input id="create-campaign-button" className="btn-glow" type="submit" value="Create Your Campaign" />
        </form>
      </div>

         
    )
  }

}

export default CampaignForm;