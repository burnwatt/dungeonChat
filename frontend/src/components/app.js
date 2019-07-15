import React from 'react';
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch, Route } from "react-router-dom";

import NavBarContainer from "./nav/navbar_container";
import SplashPage from "./splash/splash_page";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import ProfileContainer from './profile/profile_container';
import LandingContainer from "./landing/landing_container";
import CreateCampaignContainer from "./campaigns/create_campaign_container";

import CharacterSheet from "./characters/character_sheet"
import CampaignShow from "./campaigns/campaign_show_container";

import Modal from "./modal/modal";

const App = () => (
  <div>
    <NavBarContainer />
    <Modal />
    <Switch>
      <AuthRoute exact path="/" component={SplashPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <Route exact path="/profile" component={ProfileContainer} />
      <Route exact path="/landing" component={LandingContainer} />
      <Route exact path="/newcampaign" component={CreateCampaignContainer} />
      <Route exact path="/character-sheet" component={CharacterSheet} />
      <Route exact path="/campaign/:name" component={CampaignShow} />
    </Switch>
  </div>
);

export default App;