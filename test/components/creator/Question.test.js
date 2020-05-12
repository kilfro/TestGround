import React from 'react';
import Question from '../../../src/components/creator/Question';
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {NEW_TEST} from "../../../src/store/actionTypes";

describe('Question', () => {
    const mockStore = configureStore([]);
    const store = mockStore({});

    function mountWithProps(question, index) {
        store.dispatch = jest.fn();

        return mount(
            <Provider store={store}>
                <Question question={question} index={index ? index : 0}/>
            </Provider>
        );
    }

    it('should change background color', () => {
        let wrapper = mountWithProps({id: 1, multiple: false, options: []}, 0);
        expect(wrapper.find('.gray-card').length).toEqual(0);

        wrapper = mountWithProps({id: 1, multiple: false, options: []}, 1);
        expect(wrapper.find('.gray-card').length > 0).toEqual(true);
    });

    it('should change multiple', () => {
        const wrapper = mountWithProps({id: 1, multiple: false, options: []}, 0);
        wrapper.find('input#multiple').simulate('change', {target: {id: 'multiple', checked: true}});
        expect(store.dispatch).toHaveBeenCalledWith({
            type: NEW_TEST.CHANGE_QUESTION,
            payload: {
                multiple: true,
                id: 1,
                options: []
            }
        })
    });

    it('should change cost', () => {
        const wrapper = mountWithProps({id: 1, multiple: false, options: []}, 0);
        wrapper.find('input#cost').simulate('change', {target: {id: 'cost', value: 10}});
        expect(store.dispatch).toHaveBeenCalledWith({
            type: NEW_TEST.CHANGE_QUESTION,
            payload: {
                cost: 10,
                id: 1
            }
        })
    });

    it('should change question', () => {
        const wrapper = mountWithProps({id: 1, multiple: false, options: []}, 0);
        wrapper.find('textarea#question').simulate('change', {target: {id: 'question', value: 'Question?'}});
        expect(store.dispatch).toHaveBeenCalledWith({
            type: NEW_TEST.CHANGE_QUESTION,
            payload: {
                question: 'Question?',
                id: 1
            }
        })
    });

    it('should add new option', () => {
        const wrapper = mountWithProps({id: 1, multiple: false, options: [{id: 1, text: '', isRight: false}]}, 0);
        wrapper.find('button#add_option').simulate('click');

        expect(store.dispatch).toHaveBeenCalledWith({
            type: NEW_TEST.CHANGE_QUESTION,
            payload: {
                id: 1,
                options: [
                    {id: 1, text: '', isRight: false},
                    {id: 2, text: '', isRight: false}
                ]
            }
        })
    });

    it('should dispatch delete question action', () => {
        const wrapper = mountWithProps({id: 1, multiple: false, options: [{id: 1, text: '', isRight: false}]}, 0);
        wrapper.find('button.delete-question-btn').simulate('click');

        expect(store.dispatch).toHaveBeenCalledWith({
            type: NEW_TEST.REMOVE_QUESTION,
            payload: 1
        })
    });

    it('should do self-check', () => {
        let wrapper = mountWithProps({
            id: 1,
            question: '',
            multiple: false,
            options: [{id: 1, text: '', isRight: false}]
        }, 0);

        expect(wrapper.find('.self-check-green').length).toEqual(0);
        expect(wrapper.find('.self-check-red').length > 0).toEqual(true);

        wrapper = mountWithProps({
            id: 1,
            question: 'Question?',
            multiple: false,
            options: [{id: 1, text: '', isRight: false}]
        }, 0);
        expect(wrapper.find('.self-check-green').length).toEqual(0);
        expect(wrapper.find('.self-check-red').length > 0).toEqual(true);

        wrapper = mountWithProps({
            id: 1,
            question: 'Question?',
            multiple: false,
            options: [{id: 1, text: 'Text', isRight: false}]
        }, 0);
        expect(wrapper.find('.self-check-green').length).toEqual(0);
        expect(wrapper.find('.self-check-red').length > 0).toEqual(true);

        wrapper = mountWithProps({
            id: 1,
            question: 'Question?',
            multiple: false,
            options: [{id: 1, text: '', isRight: true}]
        }, 0);
        expect(wrapper.find('.self-check-green').length).toEqual(0);
        expect(wrapper.find('.self-check-red').length > 0).toEqual(true);

        wrapper = mountWithProps({
            id: 1,
            question: 'Question?',
            multiple: false,
            options: [{id: 1, text: 'Text', isRight: true}]
        }, 0);
        expect(wrapper.find('.self-check-red').length).toEqual(0);
        expect(wrapper.find('.self-check-green').length > 0).toEqual(true);
    });

    it('should reset is right', () => {
        const options = [
            {id: 1, text: 'Text1', isRight: true},
            {id: 2, text: 'Text2', isRight: true},
            {id: 3, text: 'Text3', isRight: true}
        ];
        const wrapper = mountWithProps({id: 1, multiple: true, options: options}, 0);
        wrapper.find('input#multiple').simulate('change', {target: {id: 'multiple', checked: false}});

        expect(store.dispatch).toHaveBeenCalledWith({
            type: NEW_TEST.CHANGE_QUESTION,
            payload: {
                multiple: false,
                id: 1,
                options: [
                    {id: 1, text: 'Text1', isRight: false},
                    {id: 2, text: 'Text2', isRight: false},
                    {id: 3, text: 'Text3', isRight: false}
                ]
            }
        })
    });
});