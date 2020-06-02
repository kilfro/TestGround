import {AUTH} from "../actionTypes";

export function loginWithGoogle() {
    return {
        type: AUTH.LOGIN_WITH_GOOGLE
    }
}

export const loginWithEmail = (email, password) => {
    return {
        type: AUTH.LOGIN_WITH_EMAIL,
        payload: {
            email,
            password
        }
    }
};

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

export function registerUser(email, password) {
    return {
        type: AUTH.REGISTER_REQUEST,
        payload: {
            email, password
        }
    }
}

export const unauthorized = () => {
    return {
        type: AUTH.UNAUTHORIZED
    }
};