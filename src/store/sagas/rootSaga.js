import {all} from 'redux-saga/effects';
import {watchLogin, watchLogout} from "./auth";

export function* rootSaga() {
    yield all([
        watchLogin(),
        watchLogout()
    ]);
}