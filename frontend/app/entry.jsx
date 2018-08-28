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
    window.fetchSingleRes = fetchSingleRes;
    window.fetchRestaurants = fetchRestaurants;
    window.fetch = fetch;
   
    ReactDOM.render(<Root store={store} />, root);
})