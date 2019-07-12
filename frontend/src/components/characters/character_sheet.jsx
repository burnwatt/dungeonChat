import React from 'react';
import merge from 'lodash/merge';
import wizard from "../../assets/public/images/wizard.png";

class CharacterSheet extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            name:   '',
            class:  '',
            race:   '',
            health: 0,
            magic:  0,
            gold:   0,
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
        }
    }

    handleSubmit(){
        // this.props.createCharacter({
        //     campaign_id: this.props.campaign_id,
        //     user_id: this.props.currentUser.id,
        //     char_attrs: this.state
        // })
    }

    handleCancel(){
        
    }

    componentDidMount(){

    }

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

    render(){
      return (
          <div className= "character-page">
            <div className= "container-margin">
              <div className='character-sheet-main'>
                  <div className="name-and-avatar">
                    <div className="character-avatar">
                      <div><div><i className="fas fa-user-ninja fa-3x"></i></div></div>
                    </div>
                    <div className="character-name">
                      <div>PlaceholderName</div>
                    </div>
                  </div>
                  <div className="pic-bio">
                    <div className="pic-container">
                      <div><div className="pic-div"><img src={ wizard } alt="whatever"/></div></div>
                    </div>
                    <div className="bio-container">
                      <h1>Bio</h1>
                      <textarea id="bio" 
                      placeholder="Give us your backstory and make it interesting!!"/>
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
                        <input type="text" onChange={this.handleInput("class")} />
                          

                          <label>Race</label>
                        <input type="text" onChange={this.handleInput("race")} />
                          

                          <label>Health</label>
                        <input type="number" onChange={this.handleInput("health")} />
                          

                          <label>Magic</label>
                        <input type="number" onChange={this.handleInput("magic")} />
                          

                          <label>Gold</label>
                        <input type="number" onChange={this.handleInput("gold")} />
                          
                      </div>

                      <div className='character-powers-main'>
                        <h1>Powers</h1>
                          <div className='power' id='power-1'>
                            
                            <div className="power-div">
          
                                <input type="text"
                                   placeholder="Name"
                                   onChange={this.handleNestedInput("powers", "power1", "name")} />
                              
                            </div>
                            <textarea
                                placeholder="Power Description"
                                cols="30"
                                rows="10"
                                onChange={this.handleNestedInput("powers", "power1", "description")}
                            ></textarea>
                              

                          </div>

                          <div className='power' id='power-2'>
                            <div className="power-div">
                              {/* <h3>2.</h3> */}
                              <input type="text"
                                  placeholder="Name"
                                  onChange={this.handleNestedInput("powers", "power2", "name")} />
                            </div>
                            
                              
                              <textarea
                                  placeholder="Power Description"
                                  cols="30"
                                  rows="10"
                                  onChange={this.handleNestedInput("powers", "power2", "description")}
                              ></textarea>
                          </div>

                          <div className='power' id='power-3'>
                            <div className="power-div">
                              {/* <h3>3.</h3> */}
                              <input type="text"
                                        placeholder="Name"
                                        onChange={this.handleNestedInput("powers", "power3", "name")} />
                            </div>
                              <textarea
                                  placeholder="Power Description"
                                  cols="30"
                                  rows="10"
                                  onChange={this.handleNestedInput("powers", "power3", "description")}
                              ></textarea>
                          </div>

                          <div className='power' id='power-4'>
                            <div className="power-div">
                              {/* <h3>4.</h3> */}
                              <input type="text"
                                  placeholder="Name"
                                  onChange={this.handleNestedInput("powers", "power4", "name")}
                                  />
                            </div>
                            
                              
                              <textarea
                                  placeholder="Power Description"
                                  cols="30"
                                  rows="10"
                                  onChange={this.handleNestedInput("powers", "power4", "description")}
                              ></textarea>
                          </div>

                          <div className='special-power-wrapper'>
                            <div className='special-power' id='power-special'>
                              <input type="text"
                                placeholder="Special"
                                onChange={this.handleNestedInput("powers", "special", "name")}
                              />
                              <textarea
                                placeholder="Power Description"
                                cols="30"
                                rows="10"
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
                              onChange={this.handleNestedInput("inventory", "slot1", "name")}
                            />
                          </label>
                          <textarea
                            placeholder="Item Description"
                            cols="30"
                            rows="10"
                            onChange={this.handleNestedInput("inventory", "slot1", "description")}
                          ></textarea>
                          <label>
                            <input type="number"
                              placeholder="Qty"
                              onChange={this.handleNestedInput("inventory", "slot1", "qty")}
                            />
                          </label>
                        </div>

                        <div className='inventory-slot' id='slot-2'>
                          <label>
                            <input type="text"
                              placeholder="Item 2"
                              onChange={this.handleNestedInput("inventory", "slot2", "name")}
                            />
                          </label>
                          <textarea
                            placeholder="Item Description"
                            cols="30"
                            rows="10"
                            onChange={this.handleNestedInput("inventory", "slot2", "description")}
                          ></textarea>
                          <label>
                            <input type="number"
                              placeholder="Qty"
                              onChange={this.handleNestedInput("inventory", "slot2", "qty")}
                            />
                          </label>
                        </div>

                        <div className='inventory-slot' id='slot-3'>
                          <label>
                            <input type="text"
                              placeholder="Item 3"
                              onChange={this.handleNestedInput("inventory", "slot3", "name")}
                            />
                          </label>
                          <textarea
                            placeholder="Item Description"
                            cols="30"
                            rows="10"
                            onChange={this.handleNestedInput("inventory", "slot3", "description")}
                          ></textarea>
                          <label>
                            <input type="number"
                              placeholder="Qty"
                              onChange={this.handleNestedInput("inventory", "slot3", "qty")}
                            />
                          </label>
                        </div>

                        <div className='inventory-slot' id='slot-4'>
                          <label>
                            <input type="text"
                              placeholder="Item 4"
                              onChange={this.handleNestedInput("inventory", "slot4", "name")}
                            />
                          </label>
                          <textarea
                            placeholder="Item Description"
                            cols="30"
                            rows="10"
                            onChange={this.handleNestedInput("inventory", "slot4", "description")}
                          ></textarea>
                          <label>
                            <input type="number"
                              placeholder="Qty"
                              onChange={this.handleNestedInput("inventory", "slot4", "qty")}
                            />
                          </label>
                        </div>

                        <div className='inventory-slot' id='slot-5'>
                          <label>
                            <input type="text"
                              placeholder="Item 5"
                              onChange={this.handleNestedInput("inventory", "slot5", "name")}
                            />
                          </label>
                          <textarea
                            placeholder="Item Description"
                            cols="30"
                            rows="10"
                            onChange={this.handleNestedInput("inventory", "slot5", "description")}
                          ></textarea>
                          <label>
                            <input type="number"
                              placeholder="Qty"
                              onChange={this.handleNestedInput("inventory", "slot5", "qty")}
                            />
                          </label>
                        </div>

                        <div className='inventory-slot' id='slot-6'>
                          <label>
                            <input type="text"
                              placeholder="Item 6"
                              onChange={this.handleNestedInput("inventory", "slot6", "name")}
                            />
                          </label>
                          <textarea
                            placeholder="Item Description"
                            cols="30"
                            rows="10"
                            onChange={this.handleNestedInput("inventory", "slot6", "description")}
                          ></textarea>
                          <label>
                            <input type="number"
                              placeholder="Qty"
                              onChange={this.handleNestedInput("inventory", "slot6", "qty")}
                            />
                          </label>
                        </div>

                        <div className='inventory-slot' id='slot-7'>
                          <label>
                            <input type="text"
                              placeholder="Item 7"
                              onChange={this.handleNestedInput("inventory", "slot7", "name")}
                            />
                          </label>
                          <textarea
                            placeholder="Item Description"
                            cols="30"
                            rows="10"
                            onChange={this.handleNestedInput("inventory", "slot7", "description")}
                          ></textarea>
                          <label>
                            <input type="number"
                              placeholder="Qty"
                              onChange={this.handleNestedInput("inventory", "slot7", "qty")}
                            />
                          </label>
                        </div>

                        <div className='inventory-slot' id='slot-8'>
                          <label>
                            <input type="text"
                              placeholder="Item 8"
                              onChange={this.handleNestedInput("inventory", "slot8", "name")}
                            />
                          </label>
                          <textarea
                            placeholder="Item Description"
                            cols="30"
                            rows="10"
                            onChange={this.handleNestedInput("inventory", "slot8", "description")}
                          ></textarea>
                          <label>
                            <input type="number"
                              placeholder="Qty"
                              onChange={this.handleNestedInput("inventory", "slot8", "qty")}
                            />
                          </label>
                        </div>

                      </div>

                      <div className="character-notes">
                        <h1>Notes</h1>
                        <textarea className="notes-textarea">
                        </textarea>
                      </div>
                      
                      <div className='buttons-wrapper'>
                  <button className='character-save' onClick={this.handleSubmit()}><i class="fas fa-check"></i></button>
                  <button className='character-cancel' onClick={this.handleCancel()}><i class="fas fa-times"></i></button>
                      </div>
                      
                  </form>
              </div>
            </div>
          </div>
      )
      
    }
}

export default CharacterSheet;