import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './components/pages/Login';
import NotFound from "./components/pages/NotFound";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route path={'/login'} component={Login}/>
                    <Route path={'*'} component={NotFound}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
