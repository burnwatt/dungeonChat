import React from 'react';


class DiceBox extends React.Component { 

  constructor(props) {
    super(props);
    
    this.state = {
      "6": 0,
      "8": 0,
      "10": 0,
      "20": 0
    }

    } 

  handleSubmit(e) {
    e.preventDefault();
    
  }

  // openNav() {
  //   document.getElementById("dice_box_container").style.height = "250px";
  // }

  getDice(size) {
    return (
      <div className="d-bounds">
        <i className={`red fas fa-dice-d${size}`} />
        <h3>{`d${size}`}</h3>
      </div>
    )
  }



  render () {

    return (
        <div id="dice_box_container">
          <div id="dice_box">
          <h3>Choose dice to roll</h3>

          <div id="box_within">

          </div>
          <h2>Tap dice to add to roll </h2>
          {/* <i className="red fas fa-dice-d20"></i> */}

          <div id="die-row">
              {this.getDice(6)}
              {this.getDice(8)}
              {this.getDice(10)}
              {this.getDice(20)}
          </div>

          <hr className="gray-bar"/>
          <form onSubmit={this.handleSubmit}>
            <input id="roll-dice-button" className="message-btn btn-glow" type="submit" value="Roll Dice" />
          </form>
        </div>
        <div className="dice_box_empty" />
      </div>

      
    )
  }
}

export default DiceBox;