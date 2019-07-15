import React from 'react';

class CampaignCharacters extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        const { characters } = this.props;
        const charLis = characters.map(char => <li>char</li>)
        return(
            <div>
                <ul>
                    {charLis}
                </ul>
            </div>
        )
    }
};

export default CampaignCharacters;