import React from "react";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    // console.log(this.props.currentUser.id);
  }

  componentWillReceiveProps(newState) {
  }

  render() {
    return (
      <div className='profile-main'>
        <div className='welcome-message'>
          <h1>Profile Page</h1>
          <h2>Welcome {this.props.currentUser.handle}</h2>
        </div>
        <i class="fas fa-hat-wizard fa-9x magic hat"></i>
      </div>
    )
  }

};

export default Profile;