import React from 'react';
import RemoveOptionButton from '../../../src/components/creator/RemoveOptionButton';

describe('RemoveOptionButton', () => {
    const remove = jest.fn();
    const wrapper = mount(<RemoveOptionButton id={10} remove={remove}/>);

    it('should get props', () => {
        expect(wrapper.props().id).toEqual(10);
        expect(wrapper.props().remove).toEqual(remove);
    });

    it('should call remove function', () => {
        wrapper.find('svg').simulate('click');

        expect(remove).toHaveBeenCalled();
    });
});