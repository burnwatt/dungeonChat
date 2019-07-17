import React from 'react';

const _nullRoll = () => ({
  "d6": 0,
  "d8": 0,
  "d10": 0,
  "d20": 0
})

class DiceBox extends React.Component { 

  constructor(props) {
    super(props);
    this.state = _nullRoll()
    this.handleSubmit = this.handleSubmit.bind(this);
    
    this.handleClick = this.handleClick.bind(this);
    } 

  // componentDidMount() {
 
  //   this.setState({
  //     currentUser: this.props.currentUser,
  //     campaign: this.props.campaign,
  //     userChar: this.props.userChar
  //   })
    
  // }

  handleSubmit(event) {
    
    event.preventDefault();

    
    const { currentUser, campaign, userChar } = this.props;

    let str = (userChar) ? userChar.char_attrs.name + " rolls " : "GM rolls ";
    // let str = userChar.char_attrs.name + " rolls";
    let rollResult = this.dieRoll(20).toString();
    str = str + rollResult;

    let newMessage = Object.assign({
      user_id: currentUser._id,
      campaign_id: campaign._id,
      character_id: (userChar) ? userChar._id : null,
      type: "Dice",
      body: str
    })

    // console.log(newMessage);
    this.props.createMessage(newMessage);

    this.setState(_nullRoll());
    this.props.openModal('Spinning');

    document.getElementById("dice_box_container").style.height = "0px";

    setTimeout(this.props.closeModal, 1000);
    
  }



  dieRoll(dieType) {
    return Math.floor(Math.random() * dieType + 1)
  }



  calcDiceRoll() {
    function getRoll(dieType, n) {
      let rolls = [];
      for (let i = 0; i < n; i++) {
        rolls.push(Math.floor(Math.random() * dieType + 1));
      }
      return rolls;
    }

    let combinedRolls = {};
    for (let [key, n] of Object.entries(this.state)) {
      if (n) combinedRolls[key] = getRoll(parseInt(key), n)
    }
    return combinedRolls;
    // Object.keys(this.state).forEach(key => {
    //   if (this.state[key]) {
    //     combinedRolls[key] = getRoll(parseInt(key), this.state[key])
    //   }
    // })

  }

  getDice(size) {
    return (
      <div id={size} className="d-bounds"
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
  



  render () {
    let selectedDice = [];
    for (let [key, n] of Object.entries(this.state)) {
      // console.log(key)
      if (n) selectedDice.push(this.getDisplayDice(key, n))
    }

    let selectorDice = ["d6", "d8", "d10", "d20"].map( size =>
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