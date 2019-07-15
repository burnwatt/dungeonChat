import { connect } from "react-redux";
import { signup, login } from "../../actions/session_actions";
import SignupForm from "./signup_form";

const mSP = state => ({
  signedIn: state.session.isSignedIn,
  errors: state.errors.session
});

const mDP = dispatch => ({
  signup: user => dispatch(signup(user)),
  login: user => dispatch(login(user))
});

export default connect(mSP, mDP)(SignupForm);