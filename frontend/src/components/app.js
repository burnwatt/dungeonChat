import React from 'react';
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch, Route } from "react-router-dom";

import NavBarContainer from "./nav/navbar_container";
import SplashPage from "./splash/splash_page";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import ProfileContainer from './profile/profile_container';
import LandingContainer from "./landing/landing_container";

const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <AuthRoute exact path="/" component={SplashPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute exact path="/profile" component={ProfileContainer} />
      <Route exact path="/landing" component={LandingContainer} />
    </Switch>
  </div>
);

export default App;