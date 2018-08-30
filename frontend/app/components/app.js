import React from 'react';
import SearchContainer from "./search/search_container";
import ResContainer from './res/res_container';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import SignUpFormContainer from "./sessionForm/signup_form_container";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import LoginFormContainer from './sessionForm/login_form_container';


const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={SearchContainer} />
      <Route exact path="/search/:term&:location&:radius&:price&:idx" component={ResContainer}/>
      <AuthRoute exact path="/signup" component={SignUpFormContainer} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
    </Switch>
  </div>
);

export default App;