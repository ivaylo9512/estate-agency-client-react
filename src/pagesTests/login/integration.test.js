import React from 'react';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSaga from 'redux-saga';
import LoginWatcher from '../../app/sagas/login'
import { Provider } from 'react-redux'
import { mount, } from 'enzyme';
import authenticate from '../../app/slices/authenticate'
import Login from '../../pages/login';
import 'isomorphic-fetch'
import { act } from 'react-dom/test-utils';
import Router from 'next/router';

const saga = createSaga();
const middleware = [...getDefaultMiddleware({ thunk: false }), saga]

const store = configureStore({
    reducer: {
        authenticate
    },
    middleware
})

saga.run(function*(){
    yield LoginWatcher
})

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

        wrapper.findByTestid('username').simulate('change', { target: { value: 'username' }});
        wrapper.findByTestid('password').simulate('change', { target: { value: 'password' }});
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn()});
        
        new Promise(resolve => setInterval(async() => {
            wrapper.update();
            
            const error = wrapper.findByTestid('error');
            if(error.length > 0){
                expect(error.text()).toBe('Bad credentials.');
                resolve();
            }            
        }, 200));
    })

    it('should call fetch with data', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({}), { status: 200 }))

        const wrapper = createWrapper({ isLoading: false, error: null });
        
        wrapper.findByTestid('username').simulate('change', { target: { value: 'username' }});
        wrapper.findByTestid('password').simulate('change', { target: { value: 'password' }});
        
        await act(async() => wrapper.find('form').simulate('submit', { preventDefault: jest.fn()}));

        expect(fetch).toHaveBeenCalledWith('http://localhost:8098/users/login', {body: JSON.stringify({username: 'username', password: 'password'}), headers: {'Content-Type': 'Application/json'}, method: 'POST'})
    })
})