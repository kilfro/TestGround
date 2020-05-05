import {
    loginSuccess,
    loginWithEmail,
    loginWithGoogle,
    logoutRequest,
    logoutSuccess
} from '../../../src/store/actions/auth';
import {AUTH} from '../../../src/store/actionTypes';

describe('Auth action creator', () => {
    test('login with google action is created correctly', () => {
        expect(loginWithGoogle())
            .toEqual({
                type: AUTH.LOGIN_WITH_GOOGLE
            });
    });

    test('login with email action is created correctly', () => {
        expect(loginWithEmail('email', 'password'))
            .toEqual({
                type: AUTH.LOGIN_WITH_EMAIL,
                payload: {
                    email: 'email',
                    password: 'password'
                }
            })
    });

    test('login success action is created correctly', () => {
        expect(loginSuccess({name: 'UserName'}, 'token'))
            .toEqual({
                type: AUTH.LOGIN_SUCCESS,
                payload: {
                    token: 'token',
                    user: {name: 'UserName'}
                }
            })
    });

    test('logout request action is created correctly', () => {
        expect(logoutRequest())
            .toEqual({
                type: AUTH.LOGOUT_REQUEST
            })
    });

    test('logout success action is created correctly', () => {
        expect(logoutSuccess())
            .toEqual({
                type: AUTH.LOGOUT_SUCCESS
            })
    });
});

