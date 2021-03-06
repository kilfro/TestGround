import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {AUTH} from "../actionTypes";
import {getFirebaseToken, loginWithEmail, loginWithGoogle, logUserOut, registerWithEmail} from "../../auth/auth";
import {loginSuccess, logoutSuccess} from "../actions/auth";
import {createError} from "../actions/error";
import * as API from '../../api/api';
import {createUser} from '../../api/api';

export function* watchLoginWithEmail() {
    yield takeLatest(AUTH.LOGIN_WITH_EMAIL, loginEmail);
}

function* loginEmail(action) {
    const {email, password} = action.payload;
    try {
        const data = yield call(loginWithEmail, email, password);
        const token = yield call(getFirebaseToken);
        const userFromBase = yield call(API.getUserByUid, data.uid);

        if (!userFromBase) {
            const newUser = {
                uid: data.uid,
                name: data.displayName,
                email: data.email,
                photoURL: data.photoURL
            };

            yield call(API.createUser, newUser)
        }

        yield put(loginSuccess(data, token));
    } catch (e) {
        yield put(createError(e.message));
    }
}

export function* watchLoginWithGoogle() {
    yield takeLatest(AUTH.LOGIN_WITH_GOOGLE, loginGoogle);
}

function* loginGoogle() {
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
    yield takeEvery(AUTH.LOGOUT_REQUEST, logoutUser)
}

function* logoutUser() {
    try {
        yield call(logUserOut);
        yield put(logoutSuccess());
    } catch (e) {
        yield put(createError(e.message));
    }
}

export function* watchRegister() {
    yield takeLatest(AUTH.REGISTER_REQUEST, registerUser);
}

function* registerUser(action) {
    const {email, password} = action.payload;
    try {
        const registered = yield call(registerWithEmail, email, password);
        yield put(loginSuccess({uid: registered.uid}));
        yield call(createUser, {uid: registered.uid, email});
    } catch (e) {
        createError(e.message);
    }
}