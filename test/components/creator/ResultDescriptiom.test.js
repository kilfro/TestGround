import React from 'react';
import configureStore from "redux-mock-store";
import {Provider} from 'react-redux';
import ResultDescription from '../../../src/components/creator/ResultDescription';
import {NEW_TEST} from "../../../src/store/actionTypes";

describe('ResultDescription', () => {
    const mockStore = configureStore([]);
    const store = mockStore({});
    let wrapper;

    beforeEach(() => {
        store.dispatch = jest.fn();
        wrapper = mount(
            <Provider store={store}>
                <ResultDescription result={{id: 1, min: 0, max: 0, text: ''}}/>
            </Provider>
        )
    });

    it('should dispatch remove result description action', () => {
        wrapper.find('svg').simulate('click');

        expect(store.dispatch).toHaveBeenCalledWith({
            type: NEW_TEST.REMOVE_RESULT,
            payload: 1
        })
    });

    it('should dispatch change result description action when fields was changed', () => {
        wrapper.find('input#min').simulate('change', {target: {id: 'min', value: 10}});
        expect(store.dispatch).toHaveBeenCalledWith({
            type: NEW_TEST.CHANGE_RESULT,
            payload: {id: 1, min: 10, max: 0, text: ''}
        });

        wrapper.find('input#max').simulate('change', {target: {id: 'max', value: 10}});
        expect(store.dispatch).toHaveBeenCalledWith({
            type: NEW_TEST.CHANGE_RESULT,
            payload: {id: 1, min: 0, max: 10, text: ''}
        });

        wrapper.find('textarea#text').simulate('change', {target: {id: 'text', value: 'Description text'}});
        expect(store.dispatch).toHaveBeenCalledWith({
            type: NEW_TEST.CHANGE_RESULT,
            payload: {id: 1, min: 0, max: 0, text: 'Description text'}
        });
    });
});