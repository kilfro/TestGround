import React from 'react';
import configureStore from "redux-mock-store";
import {Provider} from 'react-redux';
import ResultList from '../../../src/components/creator/ResultList';
import ResultDescription from "../../../src/components/creator/ResultDescription";
import {NEW_TEST} from "../../../src/store/actionTypes";

describe('ResultList', () => {
    const mockStore = configureStore([]);
    let customStore;

    const store = mockStore({
        newTest: {
            resultDescriptions: [
                {id: 1, min: 0, max: 10, text: ''},
                {id: 2, min: 11, max: 20, text: ''}
            ]
        }
    });

    store.dispatch = jest.fn();
    const wrapper = mount(
        <Provider store={store}>
            <ResultList/>
        </Provider>
    );

    function mountWith(result) {
        customStore = mockStore({
            newTest: {
                uid: 'UID',
                resultDescriptions: [
                    result
                ]
            }
        });

        customStore.dispatch = jest.fn();

        return mount(
            <Provider store={customStore}>
                <ResultList/>
            </Provider>
        );
    }

    it('should render result cards', () => {
        const cards = wrapper.find(ResultDescription);
        expect(cards.length).toEqual(2);
    });

    it('should dispatch add result action', () => {
        wrapper.find('button#add-btn').simulate('click');
        expect(store.dispatch).toHaveBeenCalledWith({
            type: NEW_TEST.ADD_RESULT
        })
    });

    it('self-check has to return \'false\' if \'min\' is empty', () => {
        const wrapper = mountWith({id: 1, min: '', max: 10, text: 'Text'});
        const disabled = wrapper.find('button#save-test-btn').prop('disabled');
        expect(disabled).toEqual(true);
    });

    it('self-check has to return \'false\' if \'max\' is empty', () => {
        const wrapper = mountWith({id: 1, min: 10, max: '', text: 'Text'});
        const disabled = wrapper.find('button#save-test-btn').prop('disabled');
        expect(disabled).toEqual(true);
    });

    it('self-check has to return \'false\' if \'text\' is empty', () => {
        const wrapper = mountWith({id: 1, min: 10, max: 11, text: ''});
        const disabled = wrapper.find('button#save-test-btn').prop('disabled');
        expect(disabled).toEqual(true);
    });

    it('self-check has to return \'true\' if it is OK', () => {
        const wrapper = mountWith({id: 1, min: 10, max: 11, text: 'Text'});
        const disabled = wrapper.find('button#save-test-btn').prop('disabled');
        expect(disabled).toEqual(false);
    });

    it('should dispatch insert test action', () => {
        const wrapper = mountWith({id: 1, min: 10, max: 11, text: 'Text'});
        wrapper.find('button#save-test-btn').simulate('click');

        expect(customStore.dispatch).toHaveBeenCalledWith({
            type: NEW_TEST.INSERT_TEST_TO_DB,
            payload: {
                uid: 'UID',
                resultDescriptions: [
                    {id: 1, min: 10, max: 11, text: 'Text'}
                ]
            }
        })
    });

});