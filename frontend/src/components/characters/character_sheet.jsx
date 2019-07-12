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
          <div className='character-sheet-main'>
              <h1>Character Form </h1>
              <form className='character-sheet'>
                  <div className='character-info'>
                      <label> Name
                    <input type="text" onChange={this.handleInput("name")} 
                        value={this.state.name}
                    />
                      </label>

                      <label> Class
                    <input type="text" onChange={this.handleInput("class")} />
                      </label>

                      <label> Race
                    <input type="text" onChange={this.handleInput("race")} />
                      </label>

                      <label> Health
                    <input type="number" onChange={this.handleInput("health")} />
                      </label>

                      <label> Magic
                    <input type="number" onChange={this.handleInput("magic")} />
                      </label>

                      <label> Gold
                    <input type="number" onChange={this.handleInput("gold")} />
                      </label>
                  </div>

                  <div className='character-powers-main'>

                      <div className='power' id='power-1'>
                          <label> Power Name
                        <input type="text"
                                  onChange={this.handleNestedInput("powers", "power1", "name")} />
                          </label>
                          <textarea
                              name="Power Description"
                              cols="30"
                              rows="10"
                              onChange={this.handleNestedInput("powers", "power1", "description")}
                          ></textarea>
                      </div>

                      <div className='power' id='power-2'>
                          <label> Power Name
                        <input type="text"
                                  onChange={this.handleNestedInput("powers", "power2", "name")} />
                          </label>
                          <textarea
                              name="Power Description"
                              cols="30"
                              rows="10"
                              onChange={this.handleNestedInput("powers", "power2", "description")}
                          ></textarea>
                      </div>

                      <div className='power' id='power-3'>
                          <label> Power Name
                        <input type="text"
                                  onChange={this.handleNestedInput("powers", "power3", "name")} />
                          </label>
                          <textarea
                              name="Power Description"
                              cols="30"
                              rows="10"
                              onChange={this.handleNestedInput("powers", "power3", "description")}
                          ></textarea>
                      </div>

                      <div className='power' id='power-4'>
                          <label> Power Name
                        <input type="text"
                                  onChange={this.handleNestedInput("powers", "power4", "name")}
                              />
                          </label>
                          <textarea
                              name="Power Description"
                              cols="30"
                              rows="10"
                              onChange={this.handleNestedInput("powers", "power4", "description")}
                          ></textarea>
                      </div>

                      <div className='power' id='power-special'>
                          <label> Power Name
                        <input type="text"
                                  onChange={this.handleNestedInput("powers", "special", "name")}
                              />
                          </label>
                          <textarea
                              name="Power Description"
                              cols="30"
                              rows="10"
                              onChange={this.handleNestedInput("powers", "special", "description")}
                          ></textarea>
                      </div>

                  </div>

                  <div className='character-inventory'>

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
      )
      
    }
}

export default CharacterSheet;