import React from 'react';
import { shallow } from 'enzyme';
import Login from '../../pages/login';
import { getLoginRequest } from '../../app/slices/authenticate';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(fn => fn()),
    useDispatch: jest.fn()
}))

jest.mock('../../app/slices/authenticate');

const createWrapper = (value) => {
    getLoginRequest.mockReturnValue(value);
    return shallow(
        <Login />
    )
}

describe('Login unit tests', () => {
    it('should render inputs', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });

        expect(wrapper.find('input').length).toBe(2);

        expect(wrapper.findByTestid('username').length).toBe(1); 
        expect(wrapper.findByTestid('password').length).toBe(1); 
    })

    it('should render error', () => {
        const wrapper = createWrapper({ isLoading: false, error: 'Bad credentials.' });

        expect(wrapper.findByTestid('error').text()).toBe('Bad credentials.');
    })

    it('should change input values', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });

        wrapper.findByTestid('username').simulate('change', { target: { value: 'username'} });
        wrapper.findByTestid('password').simulate('change', { target: { value: 'password'} });
        
        expect(wrapper.findByTestid('username').prop('value')).toBe('username'); 
        expect(wrapper.findByTestid('password').prop('value')).toBe('password'); 

    })
})