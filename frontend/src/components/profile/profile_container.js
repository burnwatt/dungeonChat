import { connect } from "react-redux"
import Profile from "./profile";

const mSP = state => ({
  currentUser: state.session.user
});

const mDP = dispatch => ({

});

export default connect(mSP, mDP)(Profile);