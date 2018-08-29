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


const App = () => (
    <div>
        <Switch>
            <Route exact path="/" component={SearchContainer} />
            <Route exact path='/search/:term&:location&:radius&:price' component={ResContainer} />
        </Switch>
    </div>
);

export default App;