import React from 'react';
import { mount } from 'enzyme';
import Register from '../../pages/register';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authenticate, { registerRequest } from '../../app/slices/authenticate'
import * as Redux from 'react-redux';
import createSaga from 'redux-saga';
import registerWatcher from '../../app/sagas/register';
import 'isomorphic-fetch';

const { Provider } = Redux;

const sagaMiddleware = createSaga();
const middleware = [...getDefaultMiddleware({thunk: false}), sagaMiddleware];

const store = configureStore({
    reducer: {
        authenticate,
    },
    middleware
});

sagaMiddleware.run(function*(){
    yield registerWatcher
});

global.fetch = jest.fn();

const createWrapper = () => {
    return mount(
        <Provider store={store}>
            <Register />
        </Provider>
    )
}

const user = { username: 'username', email: 'email@gmail.com', password: 'password', name: 'name', location: 'location', description: 'description' };

const changeFirstPageInputs = (wrapper) => {
    let inputs = wrapper.find('input');

    inputs.findByTestid('username').simulate('change', { target: { value: user.username } });
    inputs.findByTestid('email').simulate('change', { target: { value: user.email } });
    inputs.findByTestid('password').simulate('change', { target: { value: user.password } });
    inputs.findByTestid('repeatPassword').simulate('change', { target: { value: user.password } });

    return wrapper.find('input');
}

const changeSecondPageInputs = (wrapper) => {
    let inputs = wrapper.find('input');
        
    inputs.findByTestid('name').simulate('change', { target: { value: user.name } });
    inputs.findByTestid('location').simulate('change', { target: { value: user.location } });
    inputs.findByTestid('description').simulate('change', { target: { value: user.description } });

    return wrapper.find('input');
}

describe('Register integration tests', () => {
    it('should dispatch register return error change to page 0 and display errors', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify(
            { username: 'Username is taken.', email: 'Email is taken.', password: 'Password must be atleast 10 characters.'}), { status: 422 }))

        const wrapper = createWrapper({ isLoading: false, error: null });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        new Promise(resolve => setInterval(() => {
            wrapper.update();

            const usernameError = wrapper.findByTestid('usernameError');
            if(usernameError.length > 0){
                expect(usernameError.text()).toBe('Username is taken.')
                expect(wrapper.findByTestid('emailError').text()).toBe('Email is taken.')
                expect(wrapper.findByTestid('passwordError').text()).toBe('Password must be atleast 10 characters.')

                resolve();
            }
        }, 200))
    })

    it('should dispatch register return errors with page 1', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify(
            { name: 'You must provide name.', location: 'You must provide location.', description: 'You must provide description.'}), { status: 422 }))

        const wrapper = createWrapper({ isLoading: false, error: null });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        new Promise(resolve => setInterval(() => {
            wrapper.update();

            const name = wrapper.findByTestid('nameError');
            if(name.length > 0){
                expect(name.text()).toBe('You must provide name.')
                expect(wrapper.findByTestid('locationError').text()).toBe('You must provide location.')
                expect(wrapper.findByTestid('descriptionError').text()).toBe('You must provide description.')

                resolve();
            }
        }, 200))
    })

    it('should change inputs values page 0', () => {
        const wrapper = createWrapper();

        const inputs = changeFirstPageInputs(wrapper);

        expect(inputs.findByTestid('username').prop('value')).toBe(user.username);
        expect(inputs.findByTestid('email').prop('value')).toBe(user.email);
        expect(inputs.findByTestid('password').prop('value')).toBe(user.password);
        expect(inputs.findByTestid('repeatPassword').prop('value')).toBe(user.password);
    })

    it('should change inputs values page 1', () => {
        const wrapper = createWrapper();
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        const inputs = changeSecondPageInputs(wrapper);

        expect(inputs.findByTestid('name').prop('value')).toBe(user.name);
        expect(inputs.findByTestid('location').prop('value')).toBe(user.location);
        expect(inputs.findByTestid('description').prop('value')).toBe(user.description);
    })

    it('should call dispatch with user object with input values', () => {
        const useDispatchSpy = jest.spyOn(Redux, 'useDispatch'); 
        const mockedDispatch = jest.fn()
        useDispatchSpy.mockReturnValue(mockedDispatch);

        const wrapper = createWrapper();
        
        changeFirstPageInputs(wrapper);
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
        
        changeSecondPageInputs(wrapper);
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        expect(mockedDispatch).toHaveBeenCalledWith(registerRequest(user))
    })
}); 