import {AUTH} from "../actionTypes";

export function loginRequest() {
    return {
        type: AUTH.LOGIN_REQUEST
    }
}

export function loginSuccess(user, token) {
    return {
        type: AUTH.LOGIN_SUCCESS,
        payload: {
            user,
            token
        }
    }
}

export function logoutRequest() {
    return {
        type: AUTH.LOGOUT_REQUEST
    }
}

export function logoutSuccess() {
    return {
        type: AUTH.LOGOUT_SUCCESS
    }
}