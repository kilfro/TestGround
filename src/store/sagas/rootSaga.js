import {all} from 'redux-saga/effects';
import {watchLoginWithEmail, watchLoginWithGoogle, watchLogout, watchRegister} from "./auth";
import {watchInsertAction} from "./newTest";
import {watchSendAnswers} from "./answers";

export function* rootSaga() {
    yield all([
        watchLoginWithEmail(),
        watchLoginWithGoogle(),
        watchLogout(),
        watchRegister(),
        watchInsertAction(),
        watchSendAnswers()
    ]);
}