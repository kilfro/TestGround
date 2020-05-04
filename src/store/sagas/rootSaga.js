import {all} from 'redux-saga/effects';
import {watchLoginWithEmail, watchLoginWithGoogle, watchLogout, watchRegister} from "./auth";

export function* rootSaga() {
    yield all([
        watchLoginWithEmail(),
        watchLoginWithGoogle(),
        watchLogout(),
        watchRegister()
    ]);
}