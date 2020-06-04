import {call, put, takeLatest} from "redux-saga/effects";
import {ANSWERS} from "../actionTypes";
import * as API from "../../api/api";
import {putResult} from "../actions/result";
import {createError} from "../actions/error";

export function* watchSendAnswers() {
    yield takeLatest(ANSWERS.SEND_ANSWERS, sendAnswerAndGetResult);
}

function* sendAnswerAndGetResult(action) {
    const {testUid, answers, userUid} = action.payload;

    try {
        const result = yield call(API.sendAnswers, userUid, testUid, answers);
        yield put(putResult(result.data))
    } catch (e) {
        yield put(createError(e.message));
    }
}