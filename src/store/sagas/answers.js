import {call, put, takeLatest} from "redux-saga/effects";
import {ANSWERS} from "../actionTypes";
import * as API from "../../api/api";
import {putResult} from "../actions/result";
import {createError} from "../actions/error";
import {getFirebaseUser} from "../../auth/auth";

export function* watchSendAnswers() {
    yield takeLatest(ANSWERS.SEND_ANSWERS, sendAnswerAndGetResult);
}

function* sendAnswerAndGetResult(action) {
    const {testUid, answers, anonymous} = action.payload;

    try {
        let userId = null;
        if (!anonymous) {
            const firebaseUser = yield call(getFirebaseUser);
            const userFromBase = yield call(API.getUserByUid, firebaseUser.uid);

            if (!userFromBase) {
                yield put(createError('Пользователь не найден'));
            }

            userId = userFromBase.id;
        }

        const result = yield call(API.sendAnswers, userId, testUid, answers);
        yield put(putResult(result.data))
    } catch (e) {
        yield put(createError(e.message));
    }
}