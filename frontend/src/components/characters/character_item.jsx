import React from 'react';
import {Link} from 'react-router-dom';

function CharacterItem(props) {
    // const { character, campaign, currentUser } = this.props;
    return (
        <div className='char-item'>
            <Link to={'/character-sheet/'+ props.character._id}>
                <i className="fas fa-hat-wizard"></i>
                <span className='char-name'>{props.character.char_attrs.name}</span>
            </Link>
        </div>
    )
}

export default CharacterItem;