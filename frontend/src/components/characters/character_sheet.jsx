import React from 'react';
import merge from 'lodash/merge';

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
                      <div><div><i className="fas fa-user-ninja fa-7x"></i></div></div>
                    </div>
                    <div className="character-name">

                    </div>
                  </div>

                  <form className='character-sheet'>
                      <div className='character-info'>
                      <h1>Character Info</h1>
                          <label>Name</label>
                        <input type="text" onChange={this.handleInput("name")} 
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

                          <div className='power' id='power-1'>
                            <h1>Powers</h1>
                            <div className="power-div">
                              <h3>1.</h3>
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
                              <h3>2.</h3>
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
                              <h3>3.</h3>
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
                              <h3>4.</h3>
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

                          <div className='power' id='power-special'>
                            <div className="power-div">
                              <h3>5.</h3>
                              <input type="text"
                                  placeholder="Name"
                                  onChange={this.handleNestedInput("powers", "special", "name")}
                                  />
                            </div>
                            
                              <textarea
                                  placeholder="Power Description"
                                  cols="30"
                                  rows="10"
                                  onChange={this.handleNestedInput("powers", "special", "description")}
                              ></textarea>
                          </div>

                      </div>

                      <div className='character-inventory'>
                          <h1>Inventory</h1>
                          <div className='inventory-slot' id='slot-1'>
                              <label> Name
                            <input type="text"
                                      onChange={this.handleNestedInput("inventory", "slot1", "name")}
                                  />
                              </label>
                              <textarea
                                  name="Item Description"
                                  cols="30"
                                  rows="10"
                                  onChange={this.handleNestedInput("inventory", "slot1", "description")}
                              ></textarea>
                              <label> Qty
                            <input type="qty"
                                      onChange={this.handleNestedInput("inventory", "slot1", "qty")}
                                  />
                              </label>
                          </div>

                          <div className='inventory-slot' id='slot-2'>
                              <label> Name
                            <input type="text"
                                      onChange={this.handleNestedInput("inventory", "slot2", "name")}
                                  />
                              </label>
                              <textarea
                                  name="Item Description"
                                  cols="30"
                                  rows="10"
                                  onChange={this.handleNestedInput("inventory", "slot2", "description")}
                              ></textarea>
                              <label> Qty
                            <input type="qty"
                                      onChange={this.handleNestedInput("inventory", "slot2", "qty")}
                                  />
                              </label>
                          </div>

                          <div className='inventory-slot' id='slot-3'>
                              <label> Name
                            <input type="text"
                                      onChange={this.handleNestedInput("inventory", "slot3", "name")}
                                  />
                              </label>
                              <textarea
                                  name="Item Description"
                                  cols="30"
                                  rows="10"
                                  onChange={this.handleNestedInput("inventory", "slot3", "description")}
                              ></textarea>
                              <label> Qty
                            <input type="qty"
                                      onChange={this.handleNestedInput("inventory", "slot3", "qty")}
                                  />
                              </label>
                          </div>

                          <div className='inventory-slot' id='slot-4'>
                              <label> Name
                            <input type="text"
                                      onChange={this.handleNestedInput("inventory", "slot4", "name")}
                                  />
                              </label>
                              <textarea
                                   name="Item Description"
                                  cols="30"
                                  rows="10"
                                  onChange={this.handleNestedInput("inventory", "slot4", "description")}
                              ></textarea>
                              <label> Qty
                            <input type="qty"
                                      onChange={this.handleNestedInput("inventory", "slot4", "qty")}
                                  />
                              </label>
                          </div>

                          <div className='inventory-slot' id='slot-5'>
                              <label> Name
                            <input type="text"
                                      onChange={this.handleNestedInput("inventory", "slot5", "name")}
                                  />
                              </label>
                              <textarea
                                  name="Item Description"
                                  cols="30"
                                  rows="10"
                                  onChange={this.handleNestedInput("inventory", "slot5", "description")}
                              ></textarea>
                              <label> Qty
                            <input type="qty"
                                      onChange={this.handleNestedInput("inventory", "slot5", "qty")}
                                  />
                              </label>
                          </div>
                      </div>

                      <button className='character-save' onClick={this.handleSubmit()}>Save</button>
                      <button className='character-cancel' onClick={this.handleCancel()}>Cancel</button>
                  </form>
              </div>
            </div>
          </div>
      )
      
    }
}

export default CharacterSheet;