import React from "react";
import ReactDOM from "react-dom";
import configureStore from './store/store';
import Root from './components/root';
import {fetchSingleRes, fetchRestaurants, fetch} from './actions/res_actions';
import jwt_decode from 'jwt-decode';
import * as APIUtil from './util/session_api_util';



document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("#root");
    const store = configureStore();

    // Check for token
    if (localStorage.jwtToken) {
        // Set auth token header auth
        APIUtil.setAuthToken(localStorage.jwtToken);
        // Decode token and get user info and exp
        const decoded = jwt_decode(localStorage.jwtToken);
        // Set user and isAuthenticated
        
        store.store.dispatch(APIUtil.setCurrentUser(decoded));

        // Check for expired token
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            // Logout user
            store.store.dispatch(APIUtil.logoutUser());
            // Redirect to login
            window.location.href = '/login';
        }
    }

    window.getState = store.getState;
    window.dispatch = store.dispatch;
    window.getState = store.store.getState;
    window.dispatch = store.store.dispatch;
    window.fetchSingleRes = fetchSingleRes;
    window.fetchRestaurants = fetchRestaurants;
    window.fetch = fetch;
   
    ReactDOM.render(<Root store={store} />, root);
})