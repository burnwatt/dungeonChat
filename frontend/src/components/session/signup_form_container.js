import { connect } from "react-redux";
import { signup } from "../../actions/session_actions";
import SignupForm from "./signup_form";

const mSP = state => ({
  signedIn: state.session.isSignedIn,
  errors: state.session.errors
});

const mDP = dispatch => ({
  signup: user => dispatch(signup(user))
});

export default connect(mSP, mDP)(SignupForm);