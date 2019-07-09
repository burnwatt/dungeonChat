import React from "react";
import { withRouter } from "react-router-dom";


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
      <div>
        <form onSubmit={ this.handleSubmit }>
          <div>
            <input type="text"
              value={ this.state.email }
              onChange={this.updateField('email')}
              placeholder="Email"
            />
            <br />
            <input type="password"
              value={ this.state.password }
              onChange={ this.updateField('password') }
              placeholder="Password"
            />
            <br />
            <input type="submit" value="Submit" />
            { this.renderErrors() }
          </div>
        </form>
      </div>
    );
  }

};

export default withRouter(LoginForm);