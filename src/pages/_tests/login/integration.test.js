import React from 'react';
import LoginWatcher from 'app/sagas/login'
import { Provider } from 'react-redux'
import { mount, } from 'enzyme';
import authenticate from 'app/slices/authenticateSlice'
import Login from 'pages/login';
import 'isomorphic-fetch'
import { act } from 'react-dom/test-utils';
import Router from 'next/router';
import { createTestStore } from 'app/store';

const store = createTestStore({ reducers: { authenticate }, watchers: [ LoginWatcher ]});

global.fetch = jest.fn();

const createWrapper = () => {
    return mount(
        <Provider store={store}>
            <Login />
        </Provider>
    )
}

describe('Login integration tests', () => {
    beforeEach(() => {
        fetch.mockClear();
        jest.spyOn(Router, 'push').mockReturnValue(jest.fn());
    })

    it('should render error', async() => {
        fetch.mockImplementationOnce(() => new Response('Bad credentials.', { status: 401 }));

        const wrapper = createWrapper();

        await act(async () => wrapper.findByTestid('username').props().onChange({ target: { value: 'username' }}));
        await act(async () => wrapper.findByTestid('password').props().onChange({ target: { value: 'password' }}));
        wrapper.update();

        await act(async() => wrapper.find('form').props().onSubmit({ preventDefault: jest.fn()}));
        wrapper.update();
            
        expect(wrapper.findByTestid('error').text()).toBe('Bad credentials.');
    })

    it('should call fetch with data', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({}), { status: 200 }))

        const wrapper = createWrapper({ isLoading: false, error: null });
        
        await act(async () => wrapper.findByTestid('username').props().onChange({ target: { value: 'username' }}));
        await act(async () => wrapper.findByTestid('password').props().onChange({ target: { value: 'password' }}));
        wrapper.update();
        
        await act(async() => wrapper.find('form').props().onSubmit({ preventDefault: jest.fn()}));

        expect(fetch).toHaveBeenCalledWith('http://localhost:8098/users/login', {body: JSON.stringify({username: 'username', password: 'password'}), headers: {'Content-Type': 'Application/json'}, method: 'POST'})
    })
})