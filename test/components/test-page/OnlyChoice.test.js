import React from 'react';
import configureStore from "redux-mock-store";
import OnlyChoice from "../../../src/components/test-page/OnlyChoice";
import {Provider} from "react-redux";
import {RadioGroup} from "@material-ui/core";
import {ANSWERS} from "../../../src/store/actionTypes";

describe('OnlyChoice', () => {
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
                <OnlyChoice questionId={1} options={options} answer={answer}/>
            </Provider>
        );
    });

    it('should mark checked option', () => {
        const radioGroup = wrapper.find(RadioGroup);

        expect(radioGroup.props().value).toEqual(1);
    });

    it('should dispatch action', () => {
        wrapper.find('input[id=\"2\"]').simulate('change');

        expect(store.dispatch).toHaveBeenCalledWith({
            type: ANSWERS.CHANGE_ANSWER,
            payload: {
                questionId: 1,
                answers: [{id: "2"}]
            }
        })
    });

});