import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Login from "../../../src/components/pages/Login";
import {Provider} from "react-redux";

const mockStore = configureStore([]);

describe('Login page', () => {
    it('should be correctly', () => {
        const store = mockStore({
            auth: {
                authenticated: false
            }
        });
        const tree = renderer.create(
            <Provider store={store}>
                <Login/>
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
