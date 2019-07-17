import React from 'react';
import { connect } from 'react-redux';

import { closeModal } from '../../actions/ui/modal_actions';

// Need to import one of the form containers. Probably the create campaign form
// for now. But this should be pretty flexible, and we could import
// all the form containers into here

import CampaignForm from "../campaigns/create_campaign_container";

import DiceBoxContainer from "../dice_box/dice_box_container";

const splash_die = require("../../assets/public/images/die_glow_toomuch.png");

function Modal({ modal, closeModal }) {
  if (!modal) {
    return null;
  }

  let component;

  switch (modal) {
    case 'Campaign Creation Form':
      component = <CampaignForm />;
      break; 
    case 'Dice Box Modal':
      component = <DiceBoxContainer />;
      break;
    case 'Spinning':
      return <img id="spinning" className="spin-fast" src={splash_die} />
      break;
    default:
      return null;
  }
  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
