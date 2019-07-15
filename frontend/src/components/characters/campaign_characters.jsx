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
                // debugger
                return <CharacterItem character={char} campaign={campaign} currentUser={currentUser} key={char._id}/>
            });
        } 

        return(
            <div>
                <Link to={{
                    pathname: '/character-sheet/new',
                    state: {
                        campaign: campaign,
                        currentUser: currentUser
                    }
                }}>New Character</Link>
                <ul>
                    {chars}
                </ul>
            </div>
        )
    }
};

export default CampaignCharacters;