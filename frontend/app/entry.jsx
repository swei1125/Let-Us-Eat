import React from "react";
import ReactDOM from "react-dom";
import configureStore from './store/store';
import Root from './components/root';
import {fetchSingleRes, fetchRestaurants} from './actions/res_actions';



document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("#root");
    const store = configureStore();

    window.getState = store.getState;
    window.dispatch = store.dispatch;
    window.fetchSingleRes = fetchSingleRes;
    window.fetchRestaurants = fetchRestaurants;
   
    ReactDOM.render(<Root store={store} />, root);
})