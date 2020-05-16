import React from 'react';
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import TestCreator from "../../../src/components/creator/TestCreator";
import {NEW_TEST} from "../../../src/store/actionTypes";
import TestDescription from "../../../src/components/creator/TestDescription";
import QuestionsList from "../../../src/components/creator/QuestionsList";
import ResultList from "../../../src/components/creator/ResultList";

describe('TestCreator', () => {
    const mockStore = configureStore([]);
    const store = mockStore({
        newTest: {
            description: {
                name: 'name'
            },
            questions: [],
            resultDescriptions: []
        }
    });
    store.dispatch = jest.fn();

    const wrapper = mount(
        <Provider store={store}>
            <TestCreator/>
        </Provider>
    );

    it('should create UID', () => {
        expect(store.dispatch).toHaveBeenCalledWith({
            type: NEW_TEST.CREATE_UID,
            payload: expect.any(String)
        });
    });

    it('should render TestDescription', () => {
        expect(wrapper.find(TestDescription).length).toEqual(1);
        expect(wrapper.find(QuestionsList).length).toEqual(0);
        expect(wrapper.find(ResultList).length).toEqual(0);
    });

    it('should render QuestionsList', () => {
        wrapper.find('button#next-tab').simulate('click');

        expect(wrapper.find(TestDescription).length).toEqual(0);
        expect(wrapper.find(QuestionsList).length).toEqual(1);
        expect(wrapper.find(ResultList).length).toEqual(0);
    });

    it('should render ResultList', () => {
        wrapper.find('button#next-tab').simulate('click');

        expect(wrapper.find(TestDescription).length).toEqual(0);
        expect(wrapper.find(QuestionsList).length).toEqual(0);
        expect(wrapper.find(ResultList).length).toEqual(1);
    });

    it('should return to QuestionList', () => {
        wrapper.find('button#to-questions').simulate('click');

        expect(wrapper.find(TestDescription).length).toEqual(0);
        expect(wrapper.find(QuestionsList).length).toEqual(1);
        expect(wrapper.find(ResultList).length).toEqual(0);
    });

    it('should return to TestDescription', () => {
        wrapper.find('button#to-description').simulate('click');

        expect(wrapper.find(TestDescription).length).toEqual(1);
        expect(wrapper.find(QuestionsList).length).toEqual(0);
        expect(wrapper.find(ResultList).length).toEqual(0);
    });

});