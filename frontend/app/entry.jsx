import React from "react";
import ReactDOM from "react-dom";
import configureStore from './store/store';
import Root from './components/root';
import {fetchSingleRes, fetchRestaurants, fetch} from './actions/res_actions';



document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("#root");
    const store = configureStore();

    window.getState = store.store.getState;
    window.dispatch = store.store.dispatch;
    window.fetchSingleRes = fetchSingleRes;
    window.fetchRestaurants = fetchRestaurants;
    window.fetch = fetch;
   
    ReactDOM.render(<Root store={store} />, root);
})