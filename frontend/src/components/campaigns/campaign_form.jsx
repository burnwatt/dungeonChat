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

    } 

    this.makePrivate = this.makePrivate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    
    this.props.createCampaign(campaign);
    // this.setState({ name: '' }) This isn't complete but feel like there
    // Should be some local state clearing functionality upon submission
  }

  handleInput(field) {
    return event => this.setState({ [field]: event.target.value });
  }

  makePrivate(event) {
    event.preventDefault();
    
    this.setState({ is_private: true})

  }

  render() {

    let image = this.state.cover_art_url ? <img id="campaign-cover-art" src="#"/> : <div></div> ;
    
    
    
    return (
      <div className="campaign_form_container">

        <form className="campaign-form " onSubmit={this.handleSubmit}>
          <h1>Create Campaign</h1>
          <input type="file" className="upload_cover_art" placeholder="Add cover art to your campaign"></input>
          <div id="campaign-cover-art-container">
            {image}
          </div>
          <br />

          <div className="name-flex-container">
            <div className="icon-div">
              <div>A</div>
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
              <div>D</div>
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
              <div>R</div>
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
              <div>PW</div>
            </div>
            <input className="campaign-password-input"
              type="text"
              value={this.state.password}
              onChange={this.handleInput("password")}
              placeholder="(Optional Password)"
            />
          </div>
          <br />

          <button className="make-private-button" onClick={this.makePrivate}>Make this campaign private</button>

          <br />
          <input className="create-campaign-button" type="submit" value="Create Your Campaign" />
        </form>
      </div>
    )
  }

}

export default CampaignForm;