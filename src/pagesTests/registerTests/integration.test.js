import React from 'react';
import { mount } from 'enzyme';
import Register from '../../pages/register';
import { configureStore } from '@reduxjs/toolkit';
import authenticate from '../../app/slices/authenticate'
import * as Redux from 'react-redux';
import 'isomorphic-fetch'

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

const store = configureStore({
    reducer: {
        authenticate
    }
})

const createWrapper = () => {
    return mount(
        <Provider store={store}>
            <Register />
        </Provider>
    )
}

const user = { username: 'username', email: 'email@gmail.com', password: 'password', firstName: 'firstName', lastName: 'lastName', age: '25', country: 'Bulgaria' };

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
        
    inputs.findByTestid('firstName').simulate('change', { target: { value: user.firstName } });
    inputs.findByTestid('lastName').simulate('change', { target: { value: user.lastName } });
    inputs.findByTestid('country').simulate('change', { target: { value: user.country } });
    inputs.findByTestid('age').simulate('change', { target: { value: user.age } });

    return wrapper.find('input');
}

describe('Register integration tests', () => {

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

        expect(inputs.findByTestid('firstName').prop('value')).toBe(user.firstName);
        expect(inputs.findByTestid('lastName').prop('value')).toBe(user.lastName);
        expect(inputs.findByTestid('country').prop('value')).toBe(user.country);
        expect(inputs.findByTestid('age').prop('value')).toBe(user.age);
    })
}); 