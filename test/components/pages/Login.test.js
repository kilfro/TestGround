import React from 'react';
import Login from "../../../src/components/pages/Login";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {AUTH} from "../../../src/store/actionTypes";

describe('Login page enzyme tests', () => {
    let wrapper, store;
    const loginFunc = jest.fn();
    const loginGoogle = jest.fn();
    const mockStore = configureStore([]);

    beforeEach(() => {
        store = mockStore({
            auth: {
                authenticated: false
            }
        });

        store.dispatch = jest.fn();

        wrapper = mount(
            <Provider store={store}>
                <Login loginWithEmail={loginFunc} loginWithGoogle={loginGoogle}/>
            </Provider>
        );
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('should be correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should login with email', () => {
        wrapper.find('input#email').simulate('change', {target: {id: 'email', value: 'test@email.com'}});
        wrapper.find('input#password').simulate('change', {target: {id: 'password', value: 'password'}});

        wrapper.find('form').simulate('submit');

        expect(store.dispatch).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith({
            type: AUTH.LOGIN_WITH_EMAIL,
            payload: {email: 'test@email.com', password: 'password'}
        });
    });

    it('should login with google', () => {
        wrapper.find('button#google-btn').simulate('click');

        expect(store.dispatch).toHaveBeenCalled();
    });
});