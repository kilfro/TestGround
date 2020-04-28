import {call, put, takeLatest} from 'redux-saga/effects';
import {AUTH} from "../actionTypes";
import {getFirebaseToken, loginWithGoogle, logUserOut} from "../../auth/auth";
import {loginSuccess, logoutSuccess} from "../actions/auth";
import {createError} from "../actions/error";
import * as API from '../../api/api';

export function* watchLogin() {
    yield takeLatest(AUTH.LOGIN_REQUEST, loginUser);
}

function* loginUser() {
    try {
        const data = yield call(loginWithGoogle);
        const token = yield call(getFirebaseToken);
        const userFromBase = yield call(API.getUserByUid, data.user.uid);

        if (!userFromBase) {
            const newUser = {
                uid: data.user.uid,
                name: data.user.displayName,
                email: data.user.email,
                photoURL: data.user.photoURL
            };

            yield call(API.createUser, newUser)
        }

        yield put(loginSuccess(data.user, token));
    }
    catch (e) {
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