import React from 'react';
import {Link} from 'react-router-dom';
import merge from 'lodash/merge';
import wizard from "../../assets/public/images/wizard.png";

class CharacterSheet extends React.Component {
  
    constructor(props){
      super(props);
      this.state = {
          name: '',
          class: '',
          race: '',
          health: 0,
          magic: 0,
          gold: 0,
          powers: {
            power1: {
              name: '',
              description: '',
            },
            power2: {
              name: '',
              description: '',
            },
            power3: {
              name: '',
              description: '',
            },
            power4: {
              name: '',
              description: '',
            },
            special: {
              name: '',
              description: '',
            }
          },
          inventory: {
            slot1: {
              name: '',
              description: '',
              qty: 0
            },
            slot2: {
              name: '',
              description: '',
              qty: 0
            },
            slot3: {
              name: '',
              description: '',
              qty: 0
            },
            slot4: {
              name: '',
              description: '',
              qty: 0
            },
            slot5: {
              name: '',
              description: '',
              qty: 0
            },
            slot6: {
              name: '',
              description: '',
              qty: 0
            },
            slot7: {
              name: '',
              description: '',
              qty: 0
            },
            slot8: {
              name: '',
              description: '',
              qty: 0
            }
          },
          bio: '',
          notes: '',
          avatar: ""
      }


      // let targetChar = props.characters[props.match.params.char_id];
      
      // if (targetChar){
      //   this.state = merge({}, this.state, targetChar.char_attrs);
      //   // this.forceUpdate();
      // }

      this.picture = "";
      this.avatar = "";

      this.handleSubmit = this.handleSubmit.bind(this);
      this.abortChanges = this.abortChanges.bind(this);
      this.handleUpdate = this.handleUpdate.bind(this);
    }

  handleSubmit(e) {
    // debugger
    e.preventDefault()
    this.props.createCharacter({
      campaign_id: this.props.location.state.campaign._id,
      user_id: this.props.currentUser,
      // char_attrs: this.state.char_attrs,
      char_attrs: this.state,
    }).then(character => {
      // debugger
      const picture = this.picture;
      let formData = new FormData();
      formData.append("picture", picture);
      formData.append("character_id", character.data._id);

      this.props.postImg(formData, "char");
      return "";
    }).then(this.props.history.push(`/campaign/${this.props.location.state.campaign.name}`));

  }

    handleUpdate(e){
      e.preventDefault();
      debugger
      this.props.changeCharacter({
        campaign_id: this.props.location.state.campaign._id,
        user_id: this.props.currentUser,
        char_attrs: this.state
      }).then(this.props.history.push(`/campaign/${this.props.location.state.campaign.name}`));
    }

    handleChangeImg(e){
      e.preventDefault()
      this.picture = e.target.files[0];
      // this.postImg({img: this.state.img, aId: }, "char")
    }


  componentDidMount() {
    // debugger
    if (this.props.characters){
      let targetChar = this.props.characters[this.props.match.params.char_id];

      if (targetChar) {
        this.setState(merge({}, this.state, targetChar.char_attrs));
        // this.forceUpdate();
      }
    }
    

    this.props.getCharacter(this.props.match.params.char_id)
    if (this.state.img_id){
      this.props.fetchImg(this.state.img_id)
        .then(() => {
  
          var base64Flag = 'data:image/png;base64,';
          var imageStr = this.arrayBufferToBase64(this.props.img.data.data);
  
          this.setState({
            avatar: base64Flag + imageStr
          })
        })
    }
  }
  componentDidUpdate() {
    // debugger
    
    if (this.props.characters && Object.keys(this.props.characters).length > 0
    && !this.state.img_id && this.state.name === "") {
    let targetChar = this.props.characters[this.props.match.params.char_id];

    if (targetChar) {
      this.setState(merge({}, this.state, targetChar.char_attrs));
      // this.forceUpdate();
    }
  }
    

    if (!this.props.img && this.state.avatar === "") {
      this.props.fetchImg(this.state.img_id);
    }
    if (this.props.img && this.state.avatar === "") {
      
      // debugger
      var base64Flag = 'data:image/png;base64,';
      var imageStr = this.arrayBufferToBase64(this.props.img.data.data);

      this.setState({
        avatar: base64Flag + imageStr
      })
    
    }
   

  }

  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };


    handleInput(field) {
        return event => this.setState({ [field]: event.target.value });
    }
    
    handleNestedInput(field1, field2, field3) {
        return (e) => {
            let temp = merge({}, this.state);
            temp[field1][field2][field3] = e.target.value;
            this.setState({...temp});
        }
    }

    abortChanges(e){
      e.preventDefault();
      this.props.history.push(`/campaign/${this.props.location.state.campaign.name}`);
    }

    render(){
      let head, btn;
      
      if (this.props.history.location.pathname === "/character-sheet/new"){
        head = <h1>PlaceholderName</h1>;
        btn = <button className='character-save' onClick={this.handleSubmit}><i className="fas fa-scroll"></i><span>Save</span></button>;
      } else {
        head = <h1>{this.state.name || 'Update Character'}</h1>;
        btn = <button className='character-save' onClick={this.handleUpdate}><i className="fas fa-scroll"></i><span>Save</span></button>;
      }

      let image = wizard;
      if (this.state.img_id) {
        image = this.state.avatar;
      }
      // <img
      // src = { image }
      // alt = 'whatever' />

      return (
          <div className= "character-page">
            <div className= "container-margin">
              <div className='character-sheet-main'>
                  <div className="name-and-avatar">
                    <div className="character-avatar">
                      <div><div><i className="fas fa-user-ninja fa-3x"></i></div></div>
                    </div>
                    <div className="character-name">
                      {head}
                    </div>
                  </div>
                  <div className="pic-bio">
                    <div className="pic-container">
                      <div><div className="pic-div"><img src={ image } alt="whatever"/></div></div>
                    </div>
                    <div className="bio-container">
                      <h1>Bio</h1>
                      <textarea id="bio" 
                        placeholder="Give us your backstory and make it interesting!!"
                        onChange={this.handleInput("bio")}
                        value={this.state.bio}
                      />
                    </div>
                  </div>

                  <form className='character-sheet'>
                      <div className='character-info'>
                      <h1>Character Info</h1>
                        <label>Name</label>
                        <input type="text" 
                          onChange={this.handleInput("name")} 
                          value={this.state.name}
                        />
                          

                        <label>Class</label>
                        <input type="text" onChange={this.handleInput("class")} value={this.state.class}/>
                          

                        <label>Race</label>
                        <input type="text" onChange={this.handleInput("race")} value={this.state.race}/>
                          

                        <label>Health</label>
                        <input type="number" onChange={this.handleInput("health")} value={this.state.health}/>
                          

                        <label>Magic</label>
                        <input type="number" onChange={this.handleInput("magic")} value={this.state.magic}/>
                          

                        <label>Gold</label>
                        <input type="number" onChange={this.handleInput("gold")} value={this.state.gold}/>
                          
                      </div>

                      <div className='character-powers-main'>
                        <h1>Powers</h1>
                          <div className='power' id='power-1'>
                            
                            <div className="power-div">
          
                              <input type="text"
                                  placeholder="Name"
                                  onChange={this.handleNestedInput("powers", "power1", "name")} 
                                  value={this.state.powers.power1.name}/>
                              
                            </div>
                            <textarea
                                placeholder="Power Description"
                                cols="30"
                                rows="10"
                                value={this.state.powers.power1.description}
                                onChange={this.handleNestedInput("powers", "power1", "description")}
                            ></textarea>
                              

                          </div>

                          <div className='power' id='power-2'>
                            <div className="power-div">
                              <input type="text"
                                  placeholder="Name"
                                  onChange={this.handleNestedInput("powers", "power2", "name")} 
                                  value={this.state.powers.power2.name}/>
                            </div>
                            
                            <textarea
                                placeholder="Power Description"
                                cols="30"
                                rows="10"
                                value={this.state.powers.power2.description}
                                onChange={this.handleNestedInput("powers", "power2", "description")}
                            ></textarea>
                          </div>

                          <div className='power' id='power-3'>
                            <div className="power-div">
                              <input type="text"
                                        placeholder="Name"
                                        onChange={this.handleNestedInput("powers", "power3", "name")} 
                                        value={this.state.powers.power3.name}/>
                            </div>
                              <textarea
                                  placeholder="Power Description"
                                  cols="30"
                                  rows="10"
                                  value={this.state.powers.power3.description}
                                  onChange={this.handleNestedInput("powers", "power3", "description")}
                              ></textarea>
                          </div>

                          <div className='power' id='power-4'>
                            <div className="power-div">

                              <input type="text"
                                  placeholder="Name"
                                  value={this.state.powers.power4.name}
                                  onChange={this.handleNestedInput("powers", "power4", "name")}
                                  />
                            </div>
                            
                              
                              <textarea
                                  placeholder="Power Description"
                                  cols="30"
                                  rows="10"
                                  value={this.state.powers.power4.description}
                                  onChange={this.handleNestedInput("powers", "power4", "description")}
                              ></textarea>
                          </div>

                          <div className='special-power-wrapper'>
                            <div className='special-power' id='power-special'>
                              <input type="text"
                                placeholder="Special"
                                value={this.state.powers.special.name}
                                onChange={this.handleNestedInput("powers", "special", "name")}
                              />
                              <textarea
                                placeholder="Power Description"
                                cols="30"
                                rows="10"
                                value={this.state.powers.special.description}
                                onChange={this.handleNestedInput("powers", "special", "description")}
                              ></textarea>
                            </div>
                          </div>

                      </div>

                      <div className='character-inventory'>
                        <h1>Inventory</h1>
                        
                        <div className='inventory-slot' id='slot-1'>
                          <label>
                            <input type="text"
                              placeholder="Item 1"
                              value={this.state.inventory.slot1.name}
                              onChange={this.handleNestedInput("inventory", "slot1", "name")}
                            />
                          </label>
                          <textarea
                            placeholder="Item Description"
                            cols="30"
                            rows="10"
                            value={this.state.inventory.slot1.description}
                            onChange={this.handleNestedInput("inventory", "slot1", "description")}
                          ></textarea>
                          <label>
                            <input type="number"
                              placeholder="Qty"
                              value={this.state.inventory.slot1.qty}
                              onChange={this.handleNestedInput("inventory", "slot1", "qty")}
                            />
                          </label>
                        </div>

                        <div className='inventory-slot' id='slot-2'>
                          <label>
                            <input type="text"
                              placeholder="Item 2"
                              value={this.state.inventory.slot2.name}
                              onChange={this.handleNestedInput("inventory", "slot2", "name")}
                            />
                          </label>
                          <textarea
                            placeholder="Item Description"
                            cols="30"
                            rows="10"
                            value={this.state.inventory.slot2.description}
                            onChange={this.handleNestedInput("inventory", "slot2", "description")}
                          ></textarea>
                          <label>
                            <input type="number"
                              placeholder="Qty"
                              value={this.state.inventory.slot2.qty}
                              onChange={this.handleNestedInput("inventory", "slot2", "qty")}
                            />
                          </label>
                        </div>

                        <div className='inventory-slot' id='slot-3'>
                          <label>
                            <input type="text"
                              placeholder="Item 3"
                              value={this.state.inventory.slot3.name}
                              onChange={this.handleNestedInput("inventory", "slot3", "name")}
                            />
                          </label>
                          <textarea
                            placeholder="Item Description"
                            cols="30"
                            rows="10"
                            value={this.state.inventory.slot3.description}
                            onChange={this.handleNestedInput("inventory", "slot3", "description")}
                          ></textarea>
                          <label>
                            <input type="number"
                              placeholder="Qty"
                              value={this.state.inventory.slot3.qty}
                              onChange={this.handleNestedInput("inventory", "slot3", "qty")}
                            />
                          </label>
                        </div>

                        <div className='inventory-slot' id='slot-4'>
                          <label>
                            <input type="text"
                              placeholder="Item 4"
                              value={this.state.inventory.slot4.name}
                              onChange={this.handleNestedInput("inventory", "slot4", "name")}
                            />
                          </label>
                          <textarea
                            placeholder="Item Description"
                            cols="30"
                            rows="10"
                            value={this.state.inventory.slot4.description}
                            onChange={this.handleNestedInput("inventory", "slot4", "description")}
                          ></textarea>
                          <label>
                            <input type="number"
                              placeholder="Qty"
                              value={this.state.inventory.slot4.qty}
                              onChange={this.handleNestedInput("inventory", "slot4", "qty")}
                            />
                          </label>
                        </div>

                        <div className='inventory-slot' id='slot-5'>
                          <label>
                            <input type="text"
                              placeholder="Item 5"
                              value={this.state.inventory.slot5.name}
                              onChange={this.handleNestedInput("inventory", "slot5", "name")}
                            />
                          </label>
                          <textarea
                            placeholder="Item Description"
                            cols="30"
                            rows="10"
                            value={this.state.inventory.slot5.description}
                            onChange={this.handleNestedInput("inventory", "slot5", "description")}
                          ></textarea>
                          <label>
                            <input type="number"
                              placeholder="Qty"
                              value={this.state.inventory.slot5.qty}
                              onChange={this.handleNestedInput("inventory", "slot5", "qty")}
                            />
                          </label>
                        </div>

                        <div className='inventory-slot' id='slot-6'>
                          <label>
                            <input type="text"
                              placeholder="Item 6"
                              value={this.state.inventory.slot6.name}
                              onChange={this.handleNestedInput("inventory", "slot6", "name")}
                            />
                          </label>
                          <textarea
                            placeholder="Item Description"
                            cols="30"
                            rows="10"
                            value={this.state.inventory.slot6.description}
                            onChange={this.handleNestedInput("inventory", "slot6", "description")}
                          ></textarea>
                          <label>
                            <input type="number"
                              placeholder="Qty"
                              value={this.state.inventory.slot6.qty}
                              onChange={this.handleNestedInput("inventory", "slot6", "qty")}
                            />
                          </label>
                        </div>

                        <div className='inventory-slot' id='slot-7'>
                          <label>
                            <input type="text"
                              placeholder="Item 7"
                              value={this.state.inventory.slot7.name}
                              onChange={this.handleNestedInput("inventory", "slot7", "name")}
                            />
                          </label>
                          <textarea
                            placeholder="Item Description"
                            cols="30"
                            rows="10"
                            value={this.state.inventory.slot7.description}
                            onChange={this.handleNestedInput("inventory", "slot7", "description")}
                          ></textarea>
                          <label>
                            <input type="number"
                              placeholder="Qty"
                              value={this.state.inventory.slot7.qty}
                              onChange={this.handleNestedInput("inventory", "slot7", "qty")}
                            />
                          </label>
                        </div>

                        <div className='inventory-slot' id='slot-8'>
                          <label>
                            <input type="text"
                              placeholder="Item 8"
                              value={this.state.inventory.slot8.name}
                              onChange={this.handleNestedInput("inventory", "slot8", "name")}
                            />
                          </label>
                          <textarea
                            placeholder="Item Description"
                            cols="30"
                            rows="10"
                            value={this.state.inventory.slot8.description}
                            onChange={this.handleNestedInput("inventory", "slot8", "description")}
                          ></textarea>
                          <label>
                            <input type="number"
                              placeholder="Qty"
                              value={this.state.inventory.slot8.qty}
                              onChange={this.handleNestedInput("inventory", "slot8", "qty")}
                            />
                          </label>
                        </div>

                      </div>

                      <div className="character-notes">
                        <h1>Notes</h1>
                        <textarea 
                          className="notes-textarea"
                          onChange={this.handleInput("notes")}
                          value={this.state.notes}>
                        </textarea>
                      </div>
                      <input
                        id="file"
                        type="file"
                        name="picture"
                        accept="application/x-zip-compressed,image/*"
                        // onChange={this.handleInput("img")}
                        onChange={this.handleChangeImg.bind(this)}></input>

                      <div className='buttons-wrapper'>
                        {btn}
                        <button className='character-cancel' onClick={this.abortChanges}><i className="fas fa-skull"></i><span>Cancel</span></button>
                      </div>
                
                  </form>
              </div>
            </div>
          </div>
      )
      
    }
}

export default CharacterSheet;