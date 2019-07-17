import React from "react";
import wizard from "../../assets/public/images/wizard.png";
import merge from 'lodash/merge';


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    // console.log(this.props.currentUser.id);
  }

  componentDidUpdate(){

  }

  handleSubmit(e) {
    e.preventDefault();
    this.toggleTextArea();
  }
  handleInput(field) {
    return event => this.setState({ [field]: event.target.value });
  }
  handleNestedInput(field1, field2, field3) {

    return (e) => {
      let temp = merge({}, this.state);
      temp[field1][field2][field3] = e.target.value;
      this.setState({ ...temp });
    }
  }
  handleCancel(e){
    e.preventDefault();
    this.toggleTextArea();
  }

  toggleTextArea(){
    document.getElementsByClassName('profile-notes-textarea')[0].classList.toggle("invisible");
    document.getElementsByClassName('profile-bio-button')[0].classList.toggle("invisible");
    document.getElementsByClassName('bio-display')[0].classList.toggle("invisible");
    
  } 

  render() {
    return (
      <div className="profile-page">
        <div className="profile-container-margin">
          <div className='profile-sheet-main'>
            <div className="profile-name-and-avatar">
              <div className="profile-avatar">
                <div><div><i className="fas fa-user-ninja fa-3x"></i></div></div>
              </div>
              <div className="profile-name">
                <div>PlaceholderName</div>
              </div>
            </div>
            <div className="profile-pic-bio">
              <div className="profile-pic-container">
                <div><div className="profile-pic-div"><img src={wizard} alt="whatever" /></div></div>
              </div>
             
            </div>

            <div className='profile-sheet'>
              

              <div className="profile-notes">
                <h1></h1>
                <div className="profile-notes-textarea invisible">
                  <div className='profile-buttons-wrapper'>
                    <button className='profile-save' onClick={this.handleSubmit.bind(this)}><i class="fas fa-check"></i></button>
                    <button className='profile-cancel' onClick={this.handleCancel.bind(this)}><i class="fas fa-times"></i></button>
                  </div>
                  <textarea >
                  </textarea>
                </div>
                <button onClick={this.toggleTextArea} className="profile-bio-button">Click here to edit your pio</button>
                <div className="bio-display"></div>
              </div>

              <i class="fas fa-hat-wizard fa-9x magic hat"></i>

            </div>
          </div>
        </div>
      </div>
    )

  }

};

export default Profile;