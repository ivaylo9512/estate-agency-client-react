import React from 'react';
import { shallow } from 'enzyme';
import Login from 'pages/login';
import * as Redux from 'react-redux';
import { loginRequest } from 'app/slices/authenticateSlice';
import Link from 'next/link';
import * as redux from 'react-redux';
import { act } from 'react-dom/test-utils';

describe('Login unit tests', () => {
    let selectorSpy;
    let dispatchSpy;

    beforeAll(() => {
        selectorSpy = jest.spyOn(redux, 'useSelector');
    
        dispatchSpy = jest.spyOn(redux, 'useDispatch');
        dispatchSpy.mockReturnValue(jest.fn());
    });

    const createWrapper = (state) => {
        selectorSpy.mockReturnValue(state);
        return shallow(
            <Login />
        )
    }

    it('should render inputs', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });

        expect(wrapper.find('input').length).toBe(2);

        expect(wrapper.findByTestid('username').length).toBe(1); 
        expect(wrapper.findByTestid('password').length).toBe(1); 
    })

    it('should call dispatch login with input values', async () => {
        const mockDispatch = jest.fn();
        const spy = jest.spyOn(Redux, 'useDispatch');
        spy.mockReturnValue(mockDispatch);

        const wrapper = createWrapper({ isLoading: false, error: null});

        await act(async () => wrapper.findByTestid('username').props().onChange({ target: { value: 'username' }}));
        await act(async () => wrapper.findByTestid('password').props().onChange({ target: { value: 'password' }}));
        wrapper.update();
        
        await act(async () => wrapper.find('form').props().onSubmit({ preventDefault: jest.fn() }));

        expect(mockDispatch).toHaveBeenCalledWith(loginRequest({ username: 'username', password: 'password'}));
    })

    it('should render error', () => {
        const wrapper = createWrapper({ isLoading: false, error: 'Bad credentials.' });

        expect(wrapper.findByTestid('error').text()).toBe('Bad credentials.');
    })

    it('should change input values', async () => {
        const wrapper = createWrapper({ isLoading: false, error: null });

        await act(async () => wrapper.findByTestid('username').props().onChange({ target: { value: 'username' }}));
        await act(async () => wrapper.findByTestid('password').props().onChange({ target: { value: 'password' }}));
        wrapper.update();
        
        expect(wrapper.findByTestid('username').prop('value')).toBe('username'); 
        expect(wrapper.findByTestid('password').prop('value')).toBe('password'); 

    })

    it('should render button', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });

        expect(wrapper.findByTestid('login').length).toBe(1); 
        expect(wrapper.findByTestid('login').prop('type')).toBe('submit');
    })

    it('should render redirect', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });
        const redirect = wrapper.findByTestid('redirect');

        expect(redirect.find(Link).prop('href')).toBe('/register');
        expect(redirect.text()).toBe(`Don't have an account?<Link />`);
    })
})