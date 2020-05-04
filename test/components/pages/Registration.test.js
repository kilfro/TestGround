import React from 'react';
import configureStore from 'redux-mock-store';
import {create} from 'react-test-renderer';
import {Provider} from "react-redux";
import Registration from "../../../src/components/pages/Registration";
import {ERROR} from "../../../src/store/actionTypes";

const mockStore = configureStore([]);

describe('Registration page', () => {
    let store, wrapper;
    const createError = jest.fn();

    beforeEach(() => {
        store = mockStore({
            auth: {
                authenticated: false
            }
        });
        store.dispatch = createError;

        wrapper = mount(
            <Provider store={store}>
                <Registration/>
            </Provider>
        );
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should create error', () => {
        wrapper.find('input#email').simulate('change', {target: {id: 'email', value: 'email@test.com'}});
        wrapper.find('input#password').simulate('change', {target: {id: 'password', value: 'password'}});
        wrapper.find('input#repeatPassword').simulate('change', {target: {id: 'repeatPassword', value: 'password2'}});
        wrapper.find('form').simulate('submit', {
            preventDefault: () => {
            }
        });

        expect(createError).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith({payload: 'Пароли не совпадают', type: ERROR.CREATE});
    });
});