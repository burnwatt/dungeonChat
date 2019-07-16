import React from 'react';

class DiceBox extends React.Component { 

  constructor(props) {
    super(props);
    

    } 

  handleSubmit(e) {
    e.preventDefault();
    

    
  }

  render () {

    return (
      <div id="dice_box_container">
        <h3>Choose dice to roll</h3>

        <div id="box_within">

        </div>
        <h2>Tap dice to add to roll </h2>
        <hr className="gray-bar"/>
        <form>
        
          <i className="fas fa-dice"></i>

          <input className="roll-dice-button" type="submit" value="Roll Your Dice" />
        </form>
      </div>

      
    )
  }
}

export default DiceBox;