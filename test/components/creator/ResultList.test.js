import React from 'react';
import configureStore from "redux-mock-store";
import {Provider} from 'react-redux';
import ResultList from '../../../src/components/creator/ResultList';
import ResultDescription from "../../../src/components/creator/ResultDescription";
import {NEW_TEST} from "../../../src/store/actionTypes";

describe('ResultList', () => {
    const mockStore = configureStore([]);

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
});