import { connect } from "react-redux";
import {
  fetchImg
} from "../../actions/img_actions";
import Imgs from "./imgs";

const mSP = (state, ownProps) => {
  let imgId = ownProps.match.params.id;
  let image = "";
  if (Object.keys(state.imgs).includes(imgId)){
    image = Object.values(state.imgs[imgId]);
  }
  return {
  img: image
  }
};

const mDP = dispatch => ({
  fetchImg: (id) => dispatch(fetchImg(id))
});

export default connect(mSP, mDP)(Imgs);