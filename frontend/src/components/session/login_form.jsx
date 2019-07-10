import React from "react";
import { withRouter } from "react-router-dom";
import {Link} from 'react-router-dom';


const _nullState = () => ({
  email: "",
  password: "",
  errors: {}
});

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = _nullState();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateField = this.updateField.bind(this); 
  }

  // Once the user has been authenticated, redirect to the Tweets page
  componentDidUpdate(prevProps) {
    // if (preProps.currentUser === true ) this.props.history.push("/tweets");
    if (prevProps.errors !== this.props.errors){
      this.setState({ errors: this.props.errors });
    }
  }

  updateField(field) {
    return event => this.setState({ [field]: event.currentTarget.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    debugger
    this.props.login({
      email: this.state.email,
      password: this.state.password
    });
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div id="session-main">
        <div id="session-nav">
          <div className="container">
            <div className="back">
              <Link to="/"><i className="fas fa-dungeon" /></Link>
            </div>
            <div className="title">Login</div>
          </div>
        </div>
        <div id="session-page">
          <div id="gradient">
          <div className="session-form-container">
            <form>
              <div className="form-contents">
                <div className="input">
                  <div className="title-container">
                    <div className="input-title"><div>A</div></div>
                    <div className="bar"/>
                  </div>
                  
                  <div className="input-field">
                    <input
                      type="text"
                      value={this.state.email}
                      onChange={this.updateField("email")}
                      placeholder="Email"/>
                  </div>
                </div>
                <br />
                <div className="input">
                  <div className="title-container">
                    <div className="input-title">***</div>
                    <div className="bar"/>
                  </div>
                  
                  <div className="input-field">
                    <input
                      type="password"
                      value={this.state.password}
                      onChange={this.updateField("password")}
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div className="remember">
                  <label className="slider">
                    <input type="checkbox"/>
                    <span className="slider-round"/>
                  </label>
                  <label>Remember me</label>
                </div>
                <br />
                <div className="fit-to-width">
                  <input className="session-submit" type="submit" value="Login" 
                    onClick={this.handleSubmit}
                  />
                </div>
                
                {this.renderErrors()}
                <hr/>
                <div className="link-to-signup-container">
                  <Link to="/signup">create new account</Link>
                </div>
              </div>
            </form>
          </div>
          </div>
        </div>
      </div>
    );
  }


};

export default withRouter(LoginForm);