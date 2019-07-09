import React from "react";
import { withRouter } from "react-router-dom";


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

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) this.props.history.push("/login");
    
    this.setState({ errors: nextProps.errors });
  }

  updateField(field) {
    return event => this.setState({ [field]: event.currentTarget.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let user = (({ email, handle, password, password2 }) => 
      ({ email, handle, password, password2 }))(this.state);
    this.props.signup(user, this.props.history);
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
      <div className="login-form-container">
        <form onSubmit={ this.handleSubmit }>
          <div className="login-form">
            <br />
            <input type="text"
              value={ this.state.email }
              onChange={ this.updateField('email') }
              placeholder="Email"
            />
            <br />
            <input type="text"
              value={ this.state.handle }
              onChange={ this.updateField('handle') }
              placeholder="Handle"
            />
            <br />
            <input type="password"
              value={ this.state.password }
              onChange={this.updateField('password')}
              placeholder="Password"
            />
            <br />
            <input type="password"
              value={ this.state.password2 }
              onChange={this.updateField('password2')}
              placeholder="Confirm Password"
            />
            <br />
            <input type="submit" value="Submit" />
            { this.renderErrors() }
          </div>
        </form>
      </div>
    );
  }

}

export default withRouter(SignupForm);