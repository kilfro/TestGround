import React from 'react';
import CheckboxOption from '../../../src/components/creator/CheckboxOption';

describe('CheckboxOption', () => {
    const handleFunc = jest.fn();
    const removeFunc = jest.fn();
    const option = {
        id: 1,
        text: 'Text',
        isRight: true
    };

    const wrapper = mount(<CheckboxOption option={option} handleChange={handleFunc} remove={removeFunc}/>);

    it('should render checkbox correctly', () => {
        let checkbox = wrapper.find('input[id="isRight.1"]');

        expect(checkbox.length).toEqual(1);
        expect(checkbox.props().type).toEqual('checkbox');
        expect(checkbox.props().value).toEqual(true);

        wrapper.setProps({option: {id: 1, text: 'Text', isRight: false}});
        checkbox = wrapper.find('input[id="isRight.1"]');
        expect(checkbox.props().value).toEqual(false);
    });

    it('should show option text', () => {
        const input = wrapper.find('input[type="text"]');
        expect(input.props().value).toEqual('Text');
    });

    it('should call remove function', () => {
        wrapper.find('svg.remove-icon').simulate('click');
        expect(removeFunc).toHaveBeenCalled();
    });

    it('should call change function', () => {
        wrapper.find('input[type="text"]').simulate('change', 'New');
        expect(handleFunc).toHaveBeenCalled();
    });
});