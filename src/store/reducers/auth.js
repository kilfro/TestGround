import initialState from "../initialState";
import {AUTH} from "../actionTypes";

export const authReducer = (state = initialState.auth, action) => {
    switch (action.type) {
        case AUTH.LOGIN_SUCCESS:
            const {user, token} = action.payload;

            return {
                authenticated: true,
                photoURL: user.photoURL,
                uid: user.uid,
                displayName: user.displayName,
                token: token
            };
        case AUTH.LOGOUT_SUCCESS:
            return initialState.user;
        case AUTH.UNAUTHORIZED:
            return {...state, authenticated: false};
        default:
            return state;
    }
};