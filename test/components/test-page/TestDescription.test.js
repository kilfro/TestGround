import React from 'react';
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import TestDescription from "../../../src/components/test-page/TestDescription";

describe('TestDescription', () => {
    let store;
    const defaultProps = {
        uid: '1',
        name: 'Test name',
        anonymous: false,
        additional: 'Test description',
        needPassword: false,
        onlyRegistered: false,
        nextTab: jest.fn()
    };

    function mountWithProps(props) {
        const mockStore = configureStore([]);
        store = mockStore({});
        store.dispatch = jest.fn();

        return mount(
            <Provider store={store}>
                <TestDescription {...props}/>
            </Provider>
        );
    }

    it('should render static info', () => {
        const component = mountWithProps(defaultProps);

        const name = component.find('h2');
        expect(name.text()).toEqual(defaultProps.name);

        const additional = component.find('.additional-info');
        expect(additional.text()).toEqual(defaultProps.additional);
    });

    it('should render anonymous info if necessary', () => {
        let component = mountWithProps(defaultProps);
        let info = component.find('h5.anonymous');
        expect(info.length).toEqual(0);

        component = mountWithProps({...defaultProps, anonymous: true});
        info = component.find('h5.anonymous');
        expect(info.text()).toEqual('Анонимный тест');
    });

    it('should render password form if necessary', () => {
        let component = mountWithProps(defaultProps);
        let password = component.find('.password-box');
        expect(password.length).toEqual(0);

        component = mountWithProps({...defaultProps, needPassword: true});
        password = component.find('.password-box');
        expect(password.length).toEqual(1);
    });

    it('should go to nest tab if password isn\'t necessary', () => {
        const mockNextTab = jest.fn();
        const component = mountWithProps({...defaultProps, needPassword: false, nextTab: mockNextTab});
        component.find('button.next').simulate('click');

        expect(mockNextTab).toHaveBeenCalled();
        expect(mockNextTab).toHaveBeenCalledWith(1);
    });

});