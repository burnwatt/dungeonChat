import React from 'react';
import {Link} from 'react-router-dom';

function CharacterItem(props) {
    // const { character, campaign, currentUser } = this.props;
    
    //temporary implementation to randomize the player icons until functionality is added to allow user to select player icon
    // const ICONS = [
    //     (<i className="fas fa-alicorn"></i>),
    //     (<i className="fas fa-dragon"></i>),
    //     (<i class="fas fa-bat"></i>),
    //     (<i className="fas fa-bat"></i>)
    // ];

    // const charIcon = ICONS[Math.floor(Math.random() * Math.floor(3))]; 
    let name, stats;
    if (props.character && props.character.char_attrs){
        name = props.character.char_attrs.name;
        stats = props.character.char_attrs.class + ' | ' + props.character.char_attrs.race;
    }
    return (
        <div className='char-item'>
            <Link className='char-link'
                to={{
                    pathname: `/character-sheet/${props.character._id}`,
                    state: {
                        campaign: props.campaign,
                        currentUser: props.currentUser
                    }
                }}
            >
                {/* {charIcon} */}
                <i className="charIcon fas fa-dice-d20"></i>
                <div className='char-info'>
                    <span className='char-name'>{name}</span>
                    <span className='char-stats'>{stats}</span>
                </div>
            </Link>
        </div>
    )
}

export default CharacterItem;