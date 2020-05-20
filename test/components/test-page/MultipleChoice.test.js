import React from 'react';
import configureStore from "redux-mock-store";
import MultipleChoice from "../../../src/components/test-page/MiltipleChoice";
import {Provider} from "react-redux";
import {ANSWERS} from "../../../src/store/actionTypes";

describe('MultipleChoice', () => {
    const mockStore = configureStore([]);
    const store = mockStore({});
    store.dispatch = jest.fn();

    const options = [
        {id: 1, text: 'Option1'},
        {id: 2, text: 'Option2'}
    ];
    const answer = [{id: 1}];

    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <Provider store={store}>
                <MultipleChoice questionId={1} options={options} answer={answer}/>
            </Provider>
        );
    });

    it('should dispatch action when check', () => {
        wrapper.find('input[id=\"2\"]').simulate('change', {target: {checked: true, id: 2}});

        expect(store.dispatch).toHaveBeenCalledWith({
            type: ANSWERS.CHANGE_ANSWER,
            payload: {
                questionId: 1,
                answers: [{id: 1}, {id: 2}]
            }
        })
    });

    it('should dispatch action when uncheck', () => {
        wrapper.find('input[id=\"1\"]').simulate('change', {target: {checked: false, id: 1}});

        expect(store.dispatch).toHaveBeenCalledWith({
            type: ANSWERS.CHANGE_ANSWER,
            payload: {
                questionId: 1,
                answers: []
            }
        })
    });

});