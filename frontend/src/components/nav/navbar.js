import React from "react";
import { Link, Redirect } from "react-router-dom";
// import "./navbar.css";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(event) {
    event.preventDefault();
    this.props.logout();
    // this.props.history.push("/login");
  }

  componentWillMount() {
    
  }
  
  getLinks() {
    if (this.props.location.pathname === '/login' || this.props.location.pathname === '/signup') {
      return <div className='null-div'></div>
    }
    if (this.props.session && this.props.session.isAuthenticated || this.props.loggedIn) {
      return (
        <nav className='nav-bar'>
          <div className='nav-left'>
            <Link to='/landing'>
              <i className="fas fa-dungeon"></i>
              <span>Dungeon Chat</span>
            </Link>
          </div>
          <div className='nav-right'>
            <Link className='nav-link' to={"/profile"}>Profile</Link>
            <button className='btn' onClick={this.logoutUser}>Logout</button>
          </div>
        </nav>
      );
    } else {
      return (
        <nav className='nav-bar'>
          <div className='nav-left'>
            <Link to='/'>
              <i className="fas fa-dungeon"></i>
              <span>Dungeon Chat</span>
            </Link>
          </div>
          <div className='nav-right'>
            <Link className='nav-link' to={"/signup"}>
              <span>Signup</span>
            </Link>
            <Link className='btn' to={"/login"}>
              <span>Login</span>
            </Link>
          </div>
        </nav>
      );
    };
  }

  render() {

    return (
      <div id='nav-wrapper'>
        {this.getLinks()}
      </div>
    )
  };

}

export default NavBar;