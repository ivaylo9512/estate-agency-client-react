import React from 'react';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSaga from 'redux-saga';
import LoginWatcher from '../../app/sagas/login'
import { Provider } from 'react-redux'
import { mount } from 'enzyme';
import authenticate from '../../app/slices/authenticate'
import Login from '../../pages/login';

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
    it('should render error', (done) => {
        fetch.mockImplementationOnce(() => new Response('Bad credentials.', { status: 401 }));

        const wrapper = createWrapper();

        wrapper.findByTestid('username').simulate('change', { target: { value: 'username' }});
        wrapper.findByTestid('password').simulate('change', { target: { value: 'password' }});
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn()});

        setInterval(() => {
            wrapper.update();
            
            const error = wrapper.findByTestid('error');
            if(error.length > 0){
                expect(error.text()).toBe('Bad credentials.');
                done()
            }            
        }, 200);
    })
})