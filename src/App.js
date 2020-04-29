import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import Login from './components/pages/Login';
import NotFound from "./components/pages/NotFound";
import Registration from "./components/pages/Registration";
import HomePage from "./components/pages/HomePage";

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact path={'/'} component={HomePage}/>
                    <Route path={'/login'} component={Login}/>
                    <Route path={'/registration'} component={Registration}/>
                    <Route path={'*'} component={NotFound}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default App;
