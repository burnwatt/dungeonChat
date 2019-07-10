import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import { withRouter } from 'react-router-dom';

import NavBar from "./navbar";

const mSP = state => ({
  loggedIn: state.session.isAuthenticated
});

export default withRouter(connect(mSP, { logout })(NavBar));