import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import Login from './components/pages/Login';
import NotFound from "./components/pages/NotFound";
import Registration from "./components/pages/Registration";
import HomePage from "./components/pages/HomePage";
import {Snackbar} from "@material-ui/core";
import {Alert} from '@material-ui/lab';
import {connect} from 'react-redux';
import {deleteError} from "./store/actions/error";

const App = (props) => {
    const {error, deleteError} = props;

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

            <Snackbar open={error} autoHideDuration={6000} onClose={deleteError}>
                <Alert onClose={deleteError} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        error: state.error
    }
};

const mapDispatchToProps = {
    deleteError
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
