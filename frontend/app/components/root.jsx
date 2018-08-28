import React from 'react';
import App from "./app";
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { PersistGate } from "redux-persist/integration/react";


const Root = ({ store }) => (
    <Provider store={store.store} >
        <PersistGate loading={null} persistor={store.persistor}>
            <HashRouter>
                <App />
            </HashRouter>
        </PersistGate>
    </Provider>
)

export default Root;