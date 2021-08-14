import React from 'react';
import { mount } from 'enzyme';
import Register from '../../../pages/register';
import { configureStore } from '@reduxjs/toolkit';
import authenticate, { registerRequest } from '../../../app/slices/authenticate'
import * as Redux from 'react-redux';

const { Provider } = Redux;

const store = configureStore({
    reducer: {
        authenticate
    }
})

const createWrapper = (value) => {
    return mount(
        <Provider store={store}>
            <Register />
        </Provider>
    )
}

describe('Register integration tests', () => {

    it('should change inputs values page 0', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });

        let inputs = wrapper.find('input');

        inputs.find('#username').simulate('change', { target: { value: 'username' } });
        inputs.find('#email').simulate('change', { target: { value: 'email@gmail.com' } });
        inputs.find('#password').simulate('change', { target: { value: 'password' } });
        inputs.find('#repeatPassword').simulate('change', { target: { value: 'password' } });
        inputs = wrapper.find('input');

        expect(inputs.find('#username').prop('value')).toBe('username');
        expect(inputs.find('#email').prop('value')).toBe('email@gmail.com');
        expect(inputs.find('#password').prop('value')).toBe('password');
        expect(inputs.find('#repeatPassword').prop('value')).toBe('password');
    })

    it('should change inputs values page 1', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        let inputs = wrapper.find('input');

        inputs.find('#name').simulate('change', { target: { value: 'name' } });
        inputs.find('#location').simulate('change', { target: { value: 'location' } });
        inputs.find('#description').simulate('change', { target: { value: 'description' } });
        inputs = wrapper.find('input');

        expect(inputs.find('#name').prop('value')).toBe('name');
        expect(inputs.find('#location').prop('value')).toBe('location');
        expect(inputs.find('#description').prop('value')).toBe('description');
    })
}); 