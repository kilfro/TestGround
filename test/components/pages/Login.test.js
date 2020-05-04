import React from 'react';
import {act, create} from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Login from "../../../src/components/pages/Login";
import {Provider} from "react-redux";
import {AUTH} from "../../../src/store/actionTypes";

const mockStore = configureStore([]);

describe('Login page', () => {
    let store;
    let component;

    beforeEach(() => {
        store = mockStore({
            auth: {
                authenticated: false
            }
        });

        store.dispatch = jest.fn();

        component = create(
            <Provider store={store}>
                <Login/>
            </Provider>
        );
    });

    test('should be correctly', () => {
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('should dispatch an action on google button click', () => {
        act(() => {
            component.root.findByProps({id: 'google-btn'}).props.onClick();
        });

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith({type: AUTH.LOGIN_WITH_GOOGLE});
    });

    test('should dispatch an action on login button click', () => {
        const root = component.root;
        const event = {
            preventDefault: () => {
            }
        };
        act(() => {
            root.findByType('form').props.onSubmit(event);
        });

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith({
            type: AUTH.LOGIN_WITH_EMAIL,
            payload: {
                email: '',
                password: ''
            }
        });
    });
});