import React from 'react';
import QuestionList from '../../../src/components/creator/QuestionsList';
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import Question from "../../../src/components/creator/Question";
import {NEW_TEST} from "../../../src/store/actionTypes";

describe('QuestionList', () => {
    const mockStore = configureStore([]);
    const store = mockStore({
        newTest: {
            questions: [
                {id: 1, multiple: false, options: []},
                {id: 2, multiple: false, options: []}
            ]
        }
    });
    store.dispatch = jest.fn();

    const wrapper = mount(
        <Provider store={store}>
            <QuestionList/>
        </Provider>
    );

    it('should render questions', () => {
        expect(wrapper.find(Question).length).toEqual(2);
    });

    it('should dispatch add question action', () => {
        wrapper.find('button#add_btn').simulate('click');
        expect(store.dispatch).toHaveBeenCalledWith({
            type: NEW_TEST.ADD_QUESTION
        })
    });
});