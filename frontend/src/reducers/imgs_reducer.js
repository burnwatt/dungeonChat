import {
  RECEIVE_IMAGE, RECEIVE_IMAGES
} from '../actions/img_actions';
// import merge from "lodash/merge";

export default (state = {}, action) => {
  Object.freeze(state);
  // debugger
  switch (action.type) {
    case RECEIVE_IMAGE:
      // return {[action.img.data._id]: action.img.data.img.data}
      return {[action.img.data._id]: action.img.data.img}
    case RECEIVE_IMAGES:
      return action.imgs.data;
    default:
      return state;
  }

}