import {NEW_TEST} from "../actionTypes";
import {call, put, takeLatest} from "redux-saga/effects";
import {createError} from "../actions/error";
import {cleanNewTestState} from "../actions/newTest";
import * as API from "../../api/api";
import {getFirebaseUser} from "../../auth/auth";

export function* watchInsertAction() {
    yield takeLatest(NEW_TEST.INSERT_TEST_TO_DB, insertTest);
}

function* insertTest(action) {
    const test = action.payload;
    const uid = test.uid;

    try {
        const firebaseUser = yield call(getFirebaseUser);
        const userFromBase = yield call(API.getUserByUid, firebaseUser.uid);

        if (!userFromBase) {
            yield put(createError('Пользователь не найден'));
        }

        yield call(API.createTest, test, userFromBase.id, uid);

        yield put(cleanNewTestState);
    } catch (e) {
        yield put(createError(e.message));
    }
}