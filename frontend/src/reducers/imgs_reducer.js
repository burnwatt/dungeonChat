import {
  RECEIVE_IMAGE
} from '../actions/img_actions';
// import merge from "lodash/merge";

export default (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_IMAGE:
      return {[action.img.data._id]: action.img.data.img.data}
    default:
      return state;
  }

}