import React from 'react';
import TestDescription from "../../../src/components/creator/TestDescription";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import initialState from "../../../src/store/initialState";
import {NEW_TEST} from "../../../src/store/actionTypes";

describe('TestDescription', () => {
    let wrapper;
    const mockStore = configureStore([]);
    let store;

    function createWrapper(state) {
        store = mockStore({
            ...state
        });

        store.dispatch = jest.fn();

        wrapper = mount(
            <Provider store={store}>
                <TestDescription/>
            </Provider>
        )
    }

    it('should render correctly', () => {
        createWrapper(initialState);
        expect(wrapper).toMatchSnapshot();
    });

    it('should show password field if this is necessary', () => {
        createWrapper({
            ...initialState,
            newTest: {description: {needPassword: true}}
        });

        expect(wrapper.find('input#password')).toHaveLength(1);
    });

    it('should generate password if this is necessary', () => {
        createWrapper({
            ...initialState,
            newTest: {description: {needPassword: true}}
        });

        wrapper.find('svg.generate-icon').simulate('click');

        expect(store.dispatch).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith({
            type: NEW_TEST.CHANGE_DESCRIPTION,
            payload: {
                password: expect.any(String)
            }
        });
    });

    it('should generate action when check input was changed', () => {
        createWrapper(initialState);

        wrapper.find('input#anonymous').simulate('change', {target: {id: 'anonymous', checked: true}});

        expect(store.dispatch).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith({
            type: NEW_TEST.CHANGE_DESCRIPTION,
            payload: {anonymous: true}
        });
    });

    it('should generate action when text field was changed', () => {
        createWrapper(initialState);

        wrapper.find('input#name').simulate('change', {target: {id: 'name', value: 'New name'}});

        expect(store.dispatch).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith({
            type: NEW_TEST.CHANGE_DESCRIPTION,
            payload: {name: 'New name'}
        });
    });

    it('self-check has to return \'false\' if test name is empty', () => {
        createWrapper({
            newTest: {
                description: {
                    name: '',
                    needPassword: false
                }
            }
        });

        const disabled = wrapper.find('button#next-tab').prop('disabled');
        expect(disabled).toEqual(true);
    });

    it('self-check has to return \'false\' if needPassword is \'true\' but password is empty', () => {
        createWrapper({
            newTest: {
                description: {
                    name: 'Name',
                    needPassword: true,
                    password: ''
                }
            }
        });

        const disabled = wrapper.find('button#next-tab').prop('disabled');
        expect(disabled).toEqual(true);
    });

    it('self-check has to return \'true\' if description is OK', () => {
        createWrapper({
            newTest: {
                description: {
                    name: 'Name',
                    needPassword: true,
                    password: 'password'
                }
            }
        });

        const disabled = wrapper.find('button#next-tab').prop('disabled');
        expect(disabled).toEqual(false);
    });
});