import React from 'react';
import {Login} from "../../../src/components/pages/Login";

describe('Login page enzyme tests', () => {
    let wrapper;
    const loginFunc = jest.fn();
    const loginGoogle = jest.fn();

    beforeEach(() => {
        wrapper = mount(<Login loginWithEmail={loginFunc} loginWithGoogle={loginGoogle}/>);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('should be correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should login with email', () => {
        wrapper.find('input#email').simulate('change', {target: {id: 'email', value: 'test@email.com'}});
        wrapper.find('input#password').simulate('change', {target: {id: 'password', value: 'password'}});

        wrapper.find('form').simulate('submit');

        expect(loginFunc).toHaveBeenCalled();
        expect(loginFunc).toHaveBeenCalledWith('test@email.com', 'password');
    });

    it('should login with google', () => {
        wrapper.find('button#google-btn').simulate('click');

        expect(loginGoogle).toHaveBeenCalled();
    });
});