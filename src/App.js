import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './components/pages/Login';
import NotFound from "./components/pages/NotFound";
import {Container} from "@material-ui/core/es/index";

const App = () => {
    return (
        <div className="App">
            <Container maxWidth="md">
                <BrowserRouter>
                    <Switch>
                        <Route path={'/login'} component={Login}/>
                        <Route path={'*'} component={NotFound}/>
                    </Switch>
                </BrowserRouter>
            </Container>
        </div>
    );
};

export default App;
