import initialState from "../initialState";
import {AUTH} from "../actionTypes";

export const authReducer = (state = initialState.user, action) => {
    switch (action.type) {
        case AUTH.LOGIN_SUCCESS:
            const {user, token} = action.payload;

            return {
                authenticated: true,
                photoUrl: user.photoUrl,
                uid: user.uid,
                displayName: user.displayName,
                token: token
            };
        case AUTH.LOGOUT_SUCCESS:
            return initialState.user;
        default:
            return state;
    }
};