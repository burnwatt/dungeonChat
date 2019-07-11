import React from "react";
import CampaignIndexItem from "./campaign_index_item";
import { runInThisContext } from "vm";

class CampaignIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.tabify = this.tabify.bind(this);
  }


  componentDidMount() {
    this.setState({ cnb_games: document.getElementsByClassName("campaign-nav-button"), cnb_my_games: document.getElementById("cnb-my_games"),  })
    console.log(this.state)
  }

  tabify(tab_id) {
    let tab = document.getElementById(tab_id);
    if (tab) {
      if (tab.classList.contains("cnb-selected")) tab.classList.remove("cnb-selected")
      else tab.classList.add("cnb-selected");
    }
  }

  render() {

    let items = [];
    for (let i = 0; i < 10; i++) items.push(<CampaignIndexItem key={i} />);

    return (
      <div id="campaigns-content">
        <input type="text" className="search-bar" placeholder="Find a campaign" />
        <nav className="campaigns-index-controller">
          <button className="campaign-nav-button btn-glow">Games</button>
          <button className="campaign-nav-button btn-glow">My Games</button>
          <button id="cnb-last" className="campaign-nav-button btn-glow">+ New Game</button>
        </nav>
        <div id="campaign-index">
          { items }
        </div>
      </div>
    )
  }
}

export default CampaignIndex;