import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './store/rootReducer';
import {composeWithDevTools} from "redux-devtools-extension";
import {rootSaga} from "./store/sagas/rootSaga";
import {getFirebaseToken, getFirebaseUser} from "./auth/auth";
import {createError} from "./store/actions/error";
import {loginSuccess} from "./store/actions/auth";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(
            sagaMiddleware
        )
    )
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

getFirebaseUser()
    .then(async user => {
        if (!user) {
            return;
        }
        const token = await getFirebaseToken();
        store.dispatch(loginSuccess(user, token));
        return user;
    })
    .catch(err => createError(err));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
