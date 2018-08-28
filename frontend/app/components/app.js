import React from 'react';
import SearchContainer from "./search/search_container";
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';


const App = () => (
    <div>
        <header className="navbar">
            hello
        </header>

        <Switch>
            <Route exact path="/" component={SearchContainer} />
        </Switch>
    </div>
);

export default App;