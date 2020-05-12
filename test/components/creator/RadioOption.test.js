import React from 'react';
import RadioOption from '../../../src/components/creator/RadioOption';

describe('RadioOption', () => {
    const handleFunc = jest.fn();
    const removeFunc = jest.fn();
    const option = {
        id: 1,
        text: 'Text',
        isRight: true
    };

    const wrapper = mount(<RadioOption option={option} handleChange={handleFunc} remove={removeFunc}/>);

    it('should render radio', () => {
        const radio = wrapper.find('input[id="isRight.1"]');
        expect(radio.length).toEqual(1);
        expect(radio.props().type).toEqual('radio');
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