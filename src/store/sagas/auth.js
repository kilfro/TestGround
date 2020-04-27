import {call, put, takeLatest} from 'redux-saga/effects';
import {AUTH} from "../actionTypes";
import {getFirebaseToken, loginWithGoogle, logUserOut} from "../../auth/auth";
import {loginSuccess, logoutSuccess} from "../actions/auth";
import {createError} from "../actions/error";

export function* watchLogin() {
    yield takeLatest(AUTH.LOGIN_REQUEST, loginUser);
}

function* loginUser() {
    try {
        const data = yield call(loginWithGoogle);
        const token = yield call(getFirebaseToken);
        yield put(loginSuccess(data.user, token));
    } catch (e) {
        yield put(createError(e.message));
    }
}

export function* watchLogout() {
    yield takeLatest(AUTH.LOGOUT_REQUEST, logoutUser)
}

function* logoutUser() {
    try {
        yield call(logUserOut);
        yield put(logoutSuccess());
    } catch (e) {
        yield put(createError(e.message));
    }
}