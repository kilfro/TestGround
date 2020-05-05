import React from 'react';
import ConnectedHeader, {Header} from "../../../src/components/header/Header";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router";
import {AUTH} from "../../../src/store/actionTypes";

describe('Header component', () => {
    const mockStore = configureStore([]);

    it('should render login button', () => {
        const wrapper = shallow(
            <Header authenticated={false}/>
        );

        expect(wrapper.find('#logout_header_btn')).toHaveLength(0);
        expect(wrapper.find('#login_header_btn')).toHaveLength(1);
    });

    it('should render logout button', () => {
        const wrapper = shallow(
            <Header authenticated={true}/>
        );

        expect(wrapper.find('#login_header_btn')).toHaveLength(0);
        expect(wrapper.find('#logout_header_btn')).toHaveLength(1);
    });

    it('should call logout function', () => {
        const store = mockStore({
            auth: {
                authenticated: true
            }
        });

        store.dispatch = jest.fn();

        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <ConnectedHeader/>
                </MemoryRouter>
            </Provider>
        );

        wrapper.find('button#logout_header_btn').simulate('click');

        expect(store.dispatch).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith({type: AUTH.LOGOUT_REQUEST});
    });
});
