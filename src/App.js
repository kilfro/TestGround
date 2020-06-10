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
import Header from "./components/header/Header";
import TestCreator from "./components/creator/TestCreator";
import MainTestPage from "./components/test-page/MainTestPage";
import ResultsPage from "./components/user/results/ResultsPage";
import UserPage from "./components/user/page/UserPage";

const App = (props) => {
    const {error, deleteError} = props;

    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <Switch>
                    <Route exact path={'/'} component={HomePage}/>
                    <Route path={'/login'} component={Login}/>
                    <Route path={'/registration'} component={Registration}/>
                    <Route path={'/create'} component={TestCreator}/>
                    <Route path={'/test/:uid'} component={MainTestPage}/>
                    <Route exact path={'/user'} component={UserPage}/>
                    <Route exact path={'/user/results'} component={ResultsPage}/>
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
