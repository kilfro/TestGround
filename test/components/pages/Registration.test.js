import React from 'react';
import configureStore from 'redux-mock-store';
import {create} from 'react-test-renderer';
import {Provider} from "react-redux";
import Registration from "../../../src/components/pages/Registration";

const mockStore = configureStore([]);

describe('Registration page', () => {
    let store, component;

    beforeEach(() => {
        store = mockStore({
            auth: {
                authenticated: false
            }
        });

        component = create(
            <Provider store={store}>
                <Registration/>
            </Provider>
        );
    });

    test('should render correctly', () => {
        expect(component.toJSON()).toMatchSnapshot();
    });
});