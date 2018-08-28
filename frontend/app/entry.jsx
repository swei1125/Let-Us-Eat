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

<<<<<<< HEAD
    window.getState = store.store.getState;
    window.dispatch = store.store.dispatch;
=======
    if (localStorage.jwtToken) {
        APIUtil.setAuthToken(localStorage.jwtToken);

        const decoded = jwt_decode(localStorage.jwtToken);
        store.dispatch(APIUtil.setCurrentUser(decoded));

        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
            store.dispatch(APIUtil.logoutUser());
            window.location.href = '/login';
        }
    }

    window.getState = store.getState;
    window.dispatch = store.dispatch;
>>>>>>> dad30d44a26b2b5ac7dfd4cf5a494fe27c8f3c07
    window.fetchSingleRes = fetchSingleRes;
    window.fetchRestaurants = fetchRestaurants;
    window.fetch = fetch;
   
    ReactDOM.render(<Root store={store} />, root);
})