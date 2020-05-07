import React from 'react';
import TestDescription from "../../../src/components/creator/TestDescription";

describe('TestDescription', () => {
    let wrapper;
    let changeFieldHandler = jest.fn();

    beforeEach(() => {
        wrapper = mount(
            <TestDescription changeFieldHandler={changeFieldHandler} needPassword={false}/>
        )
    });

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should show password field if necessary', () => {
        expect(wrapper.find('input#password')).toHaveLength(0);

        wrapper.setProps({needPassword: true});

        expect(wrapper.find('input#password')).toHaveLength(1);
    });

    it('should generate password if necessary', () => {
        wrapper.setProps({needPassword: true});
        wrapper.find('svg.generate-icon').simulate('click');

        expect(changeFieldHandler).toHaveBeenCalled();
        expect(changeFieldHandler).toHaveBeenCalledWith({target: {id: 'password', value: expect.any(String)}});
    });
});