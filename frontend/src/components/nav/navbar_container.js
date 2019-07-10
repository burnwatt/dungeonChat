import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";

import NavBar from "./navbar";

const mSP = state => ({
  loggedIn: state.session.isAuthenticated
});

export default connect(mSP, { logout })(NavBar);