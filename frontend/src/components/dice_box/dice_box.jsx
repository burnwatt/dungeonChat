import React from 'react';

const _nullRoll = () => ({
  "d6": 0,
  "d8": 0,
  "d10": 0,
  "d20": 0
})

const TYPES = {
  "d6": 6,
  "d8": 8,
  "d10": 10,
  "d20": 20
}

class DiceBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = _nullRoll()
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleClick = this.handleClick.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { currentUser, campaign, userChar } = this.props;

    let dieCollection = this.calcDiceRoll();

    let strFrg = []
    let total = 0;
    for (let [key, c] of Object.entries(dieCollection)) {
      strFrg.push(`${c.length}${key}(${c.join("+")})`);
      total += c.reduce((a, b) => a + b, 0);
    }
    strFrg = strFrg.join(" + ") + ` = ${total}`;


    let str = (userChar) ? userChar.char_attrs.name + " rolls " : "GM rolls ";
    str = str + strFrg;
    console.log(str);

    let newMessage = {
      user_id: currentUser._id,
      campaign_id: campaign._id,
      character_id: (userChar) ? userChar._id : null,
      type: "Dice",
      body: str
    }

    this.props.createMessage(newMessage);
    console.log(newMessage);

    this.setState(_nullRoll());
    this.props.openModal('Spinning');
    document.getElementById("dice_box_container").style.height = "0px";
    setTimeout(this.props.closeModal, 1000);
  }

  calcDiceRoll() {
    function getRoll(dieType, n) {
      let rolls = [];
      for (let i = 0; i < n; i++) {
        rolls.push(Math.floor(Math.random() * TYPES[dieType] + 1));
      }
      return rolls;
    }

    let combinedRolls = {};
    for (let [key, n] of Object.entries(this.state)) {
      if (n) combinedRolls[key] = getRoll(key, n)
    }
    return combinedRolls;
  }

  getDice(size) {
    return (
      <div id={size} className="d-bounds" key={`d-show-${size}`}
        onClick={() => this.handleClick(size)}>
        <h3>{size}</h3>
        <i className={`red fas fa-dice-d20`} />
      </div>
    )
  }

  getDisplayDice(size, n) {
    return (
      <div className="d-bounds" key={`d-count-${size}`}>
        <h3>{size}</h3>
        <i className={`red fas fa-dice-d20`} />
        <h3 className="d-display-count">{`x${n}`}</h3>
      </div>
    )
  }

  handleClick(dieType) {
    this.setState({ [dieType]: this.state[dieType] + 1 })
  }


  render() {
    let selectedDice = [];
    for (let [key, n] of Object.entries(this.state)) {

      if (n) selectedDice.push(this.getDisplayDice(key, n))
    }

    let selectorDice = ["d6", "d8", "d10", "d20"].map(size =>
      this.getDice(size)
    )

    return (
      <div id="dice_box_container">
        <div id="dice_box">
          <h3>Choose dice to roll</h3>

          <div id="box_within">
            <div className="die-row">
              {selectedDice}
            </div>
          </div>
          <h2>Tap dice to add to roll </h2>

          <div className="die-row">
            {selectorDice}
          </div>

          <hr className="gray-bar" />
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
