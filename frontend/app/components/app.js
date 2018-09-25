import React from 'react';
import SearchContainer from "./search/search_container";
import ResContainer from './res/res_container';
import ProfileContainer from './profile/user_profile_container'
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


const App = () => {

  window.onload = function () {
    const thediv = document.getElementById("mainView");
    const imgarray = ["../../images/search1.jpg", "../../images/search2.jpg", "../../images/search3.jpg", "../../images/search4.jpg", "../../images/search5.jpg", "../../images/search6.jpg", "../../images/search7.jpg", "../../images/search8.jpg", "../../images/search9.jpg", "../../images/search10.jpg"];  
    const spot = Math.floor(Math.random() * imgarray.length);
    thediv.style.background = `url(${imgarray[spot]})`;
    thediv.style.backgroundRepeat = `no-repeat`;
    thediv.style.backgroundAttachment = `fixed`;
    thediv.style.width = `100%`;
    thediv.style.height = `100%`;
  }  

  return (
  <div>
    <Switch>
      <Route exact path="/" component={SearchContainer} />
      <Route exact path="/search/:term&:location&:radius&:price&:open_now&:idx" component={ResContainer}/>
      <ProtectedRoute exact path="/profile" component={ProfileContainer} />
      <AuthRoute exact path="/signup" component={SignUpFormContainer} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <Route path="/" render={() => <Redirect to="/" />} />
    </Switch>
  </div>
  )
};

export default App;