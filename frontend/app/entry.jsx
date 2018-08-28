import React from "react";
import ReactDOM from "react-dom";
import configureStore from './store/store';
import Root from './components/root';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import {fetchSingleRes, fetchRestaurants, fetch} from './actions/res_actions';



document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("#root");
    const store = configureStore();

    window.getState = store.getState;
    window.dispatch = store.dispatch;
    window.fetchSingleRes = fetchSingleRes;
    window.fetchRestaurants = fetchRestaurants;
    window.fetch = fetch;
   
    ReactDOM.render(<Root store={store} />, root);
})