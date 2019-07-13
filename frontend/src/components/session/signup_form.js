import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';


const _nullState = () => ({
  email: "",
  handle: "",
  password: "",
  password2: "",
  errors: {}
});

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = _nullState();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.signedIn === true) this.props.history.push("/login");
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  updateField(field) {
    return event => this.setState({ [field]: event.currentTarget.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let user = (({ email, handle, password, password2 }) => 
      ({ email, handle, password, password2 }))(this.state);
    this.props.signup(user, this.props.history);
    // this.props.history.push('/login');
  }

  renderErrors() {
    const { errors } = this.state;
    const errDat = Object.keys(errors).map((error, idx) => (
      <li key={`error-${idx}`}>{ errors[error] }</li>
    ));

    return (
      <ul>
        { errDat }
      </ul>
    )
  }

  render() {
    return (
      <div id="session-main">
        <div id="session-nav">
          <div className="container">
            <div className="back">
              <Link to="/"><i className="far fa-arrow-alt-circle-left"></i></Link>
            </div>
            <div className="title">Sign up</div>
          </div>
        </div>
        <div id="session-page">
          <div id="gradient">
            <div className="session-form-container">
              <form>
                <div className="form-contents">
                  <div className="input">
                    <div className="title-container">
                      <div className="input-title"><div><i className="fas fa-scroll"></i></div></div>
                      <div className="bar" />
                    </div>

                    <div className="input-field">
                      <input
                        type="text"
                        value={this.state.email}
                        onChange={this.updateField("email")}
                        placeholder="Email" />
                    </div>
                  </div>
                  <br />
                  <div className="input">
                    <div className="title-container">
                      <div className="input-title"><div><i className="fas fa-hat-wizard"></i></div></div>
                      <div className="bar" />
                    </div>

                    <div className="input-field">
                      <input type="text"
                        value={this.state.handle}
                        onChange={this.updateField('handle')}
                        placeholder="Handle"
                      />
                    </div>
                  </div>
                  <br />
                  <div className="input">
                    <div className="title-container">
                      <div className="input-title"><i className="fas fa-gem"></i></div>
                      <div className="bar" />
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
                  <br />
                  <div className="input">
                    <div className="title-container">
                      <div className="input-title"><i className="fas fa-gem"></i></div>
                      <div className="bar" />
                    </div>

                    <div className="input-field">
                      <input
                        type="password"
                        value={this.state.password2}
                        onChange={this.updateField("password2")}
                        placeholder="Confirm Password"
                      />
                    </div>
                  </div>
                  <div className="remember">
                    <label className="slider">
                      <input type="checkbox" />
                      <span className="slider-round" />
                    </label>
                    <label>Remember me</label>
                  </div>
                  <br />
                  <div className="fit-to-width">
                    <input className="session-submit" type="submit" value="Sign Up"
                      onClick={this.handleSubmit}
                    />
                  </div>

                  {this.renderErrors()}
                  <hr />
                  <div className="link-to-signup-container">
                    <span>Already have an account?</span>
                    <Link to="/login">Login</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default withRouter(SignupForm);