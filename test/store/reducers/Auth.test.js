import {authReducer} from '../../../src/store/reducers/auth';
import initialState from '../../../src/store/initialState';
import {AUTH} from '../../../src/store/actionTypes';

const token = 'user token';
const user = {
    photoURL: 'photo.url',
    displayName: 'User Name',
    uid: 'user UID'
};
const loginAction = {
    type: AUTH.LOGIN_SUCCESS,
    payload: {
        user,
        token
    }
};
const logoutAction = {
    type: AUTH.LOGOUT_SUCCESS
};

describe('Auth reducer', () => {
    it('should return initial state', () => {
        expect(authReducer(undefined, {})).toEqual(initialState.auth);
    });

    it('should add user in state', () => {
        const returnedState = authReducer({}, loginAction);

        expect(returnedState).toEqual({
            ...user, token,
            authenticated: true
        })
    });

    it('should delete user from state', () => {
        const returnedState = authReducer({
                ...user, token,
                authenticated: true
            },
            logoutAction);

        expect(returnedState).toEqual(initialState.auth);
    });
});