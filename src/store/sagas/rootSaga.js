import {all} from 'redux-saga/effects';
import {watchLoginWithEmail, watchLoginWithGoogle, watchLogout} from "./auth";

export function* rootSaga() {
    yield all([
        watchLoginWithEmail(),
        watchLoginWithGoogle(),
        watchLogout()
    ]);
}