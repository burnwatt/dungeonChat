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
      <div>
        <h1>Profile Page, welcome {this.props.currentUser.handle}</h1>
      </div>
    )
  }

};

export default Profile;