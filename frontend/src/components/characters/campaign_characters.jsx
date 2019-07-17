import React from 'react';
import CharacterItem from './character_item';
import {Link} from 'react-router-dom';

class CampaignCharacters extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        const { characters, campaign, currentUser } = this.props;

        let chars = <div></div>

        if (characters){
            chars = Object.values(characters).map(char => {
                return <CharacterItem character={char} campaign={campaign} currentUser={currentUser} key={char._id}/>
            });
        } 

        return(
            <div className='camp-char-wrapper'>
                <nav className='camp-char-nav'>
                    <h1>Characters</h1>
                    <Link className='new-char-link' 
                        to={{
                        pathname: '/character-sheet/new',
                        state: {
                                campaign: campaign,
                                currentUser: currentUser
                            }
                        }}
                        ><i className="fas fa-user-plus icon-glow"></i>
                    </Link>
                </nav>
                <div className='camp-char-list'>
                    {chars}
                </div>
            </div>
        )
    }
};

export default CampaignCharacters;