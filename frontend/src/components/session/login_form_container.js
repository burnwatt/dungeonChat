import { connect } from "react-redux";
import { login } from "../../actions/session_actions";
import LoginForm from "./login_form";

const mSP = state => ({
  errors: state.session.errors
});

const mDP = dispatch => ({
  login: user => dispatch(login(user))
});

export default connect(mSP, mDP)(LoginForm);