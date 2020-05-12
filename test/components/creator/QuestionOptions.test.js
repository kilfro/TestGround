import React from 'react';
import {Provider} from 'react-redux';
import QuestionOptions from '../../../src/components/creator/QuestionOptions';
import configureStore from "redux-mock-store";
import {RadioGroup} from "@material-ui/core";
import RadioOption from "../../../src/components/creator/RadioOption";
import CheckboxOption from "../../../src/components/creator/CheckboxOption";
import {NEW_TEST} from "../../../src/store/actionTypes";

describe('QuestionOptions', () => {
    const mockStore = configureStore([]);
    const store = mockStore({});

    function mountWithProps(options, multiple) {
        store.dispatch = jest.fn();

        return mount(
            <Provider store={store}>
                <QuestionOptions questionId={1} multiple={multiple} options={options}/>
            </Provider>
        );
    }

    it('should render radio input if multiple id false', () => {
        const wrapper = mountWithProps([{id: 1, text: '', isRight: false}], false);

        expect(wrapper.find(RadioGroup).length).toEqual(1);
        expect(wrapper.find(RadioOption).length).toEqual(1);
    });

    it('should render checkbox input if multiple id true', () => {
        const wrapper = mountWithProps([{id: 1, text: '', isRight: false}], true);

        expect(wrapper.find(CheckboxOption).length).toEqual(1);
    });

    it('handleCheckBoxChange has to work correctly with radio text', () => {
        const wrapper = mountWithProps([{id: 1, text: '', isRight: false}], false);

        wrapper.find('input[id="text.1"]').simulate('change', {target: {id: 'text.1', value: 'Text'}});
        expect(store.dispatch).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(
            {
                type: NEW_TEST.CHANGE_QUESTION,
                payload: {
                    id: 1,
                    options: [{id: 1, text: 'Text', isRight: false}]
                }
            });
    });

    it('handleCheckBoxChange has to work correctly with checkbox text', () => {
        const wrapper = mountWithProps([{id: 1, text: '', isRight: false}], true);

        wrapper.find('input[id="text.1"]').simulate('change', {target: {id: 'text.1', value: 'Text'}});
        expect(store.dispatch).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(
            {
                type: NEW_TEST.CHANGE_QUESTION,
                payload: {
                    id: 1,
                    options: [{id: 1, text: 'Text', isRight: false}]
                }
            });
    });

    it('handleCheckBoxChange has to work correctly with checkbox', () => {
        const wrapper = mountWithProps([{id: 1, text: '', isRight: false}], true);

        wrapper.find('input[id="isRight.1"]').simulate('change', {target: {id: 'isRight.1', checked: true}});
        expect(store.dispatch).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(
            {
                type: NEW_TEST.CHANGE_QUESTION,
                payload: {
                    id: 1,
                    options: [{id: 1, text: '', isRight: true}]
                }
            });
    });

    it('handleCheckBoxChange has to change only one option', () => {
        const options = [
            {id: 1, text: 'Text', isRight: false},
            {id: 2, text: '', isRight: false}
        ];

        const wrapper = mountWithProps(options, true);

        wrapper.find('input[id="text.2"]').simulate('change', {target: {id: 'text.2', value: 'Text2'}});
        expect(store.dispatch).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(
            {
                type: NEW_TEST.CHANGE_QUESTION,
                payload: {
                    id: 1,
                    options: [
                        {id: 1, text: 'Text', isRight: false},
                        {id: 2, text: 'Text2', isRight: false}
                    ]
                }
            });
    });

    it('handleRadioGroupChange has to work correctly', () => {
        const options = [
            {id: 1, text: '', isRight: false},
            {id: 2, text: '', isRight: false}
        ];

        const wrapper = mountWithProps(options, false);
        wrapper.find('input[id="isRight.1"]').simulate('change', {target: {value: 1}});
        expect(store.dispatch).toHaveBeenCalledWith(
            {
                type: NEW_TEST.CHANGE_QUESTION,
                payload: {
                    id: 1,
                    options: [
                        {id: 1, text: '', isRight: true},
                        {id: 2, text: '', isRight: false}
                    ]
                }
            });

        wrapper.find('input[id="isRight.2"]').simulate('change', {target: {value: 2}});
        expect(store.dispatch).toHaveBeenCalledWith(
            {
                type: NEW_TEST.CHANGE_QUESTION,
                payload: {
                    id: 1,
                    options: [
                        {id: 1, text: '', isRight: false},
                        {id: 2, text: '', isRight: true}
                    ]
                }
            });
    });

    it('should remove option', () => {
        const options = [
            {id: 1, text: '', isRight: false},
            {id: 2, text: '', isRight: false}
        ];

        const wrapper = mountWithProps(options, false);
        wrapper.find('svg.remove-icon').first().simulate('click', {target: {id: 1}});
        expect(store.dispatch).toHaveBeenCalledWith(
            {
                type: NEW_TEST.CHANGE_QUESTION,
                payload: {
                    id: 1,
                    options: [
                        {id: 2, text: '', isRight: false}
                    ]
                }
            }
        );
    });

});
