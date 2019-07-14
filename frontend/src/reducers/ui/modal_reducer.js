import { merge } from 'lodash';
import { OPEN_MODAL, CLOSE_MODAL } from '../../actions/ui/modal_actions';


const modalReducer = (state = {}, action) => {
  // let newState = merge({}, state);
  Object.freeze(state);

  switch (action.type) {

    default: return state;

    case (OPEN_MODAL): {
      return action.modal;
    }

    case (CLOSE_MODAL): {
      return null;
    }
  }
};

export default modalReducer;