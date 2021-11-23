import React from 'react';
import { mount } from 'enzyme';
import Register from 'pages/register';
import authenticate from 'app/slices/authenticateSlice'
import registerWatcher from 'app/sagas/register';
import 'isomorphic-fetch';
import { act } from 'react-dom/test-utils';
import Router from 'next/router';
import { createTestStore } from 'app/store';
import { Provider } from 'react-redux';


const store = createTestStore({ reducers: { authenticate }, watchers: [ registerWatcher ]})


global.fetch = jest.fn();

const createWrapper = () => {
    return mount(
        <Provider store={store}>
            <Register />
        </Provider>
    )
}

const user = { username: 'username', password: 'password', name: 'name', email: 'email@gmail.com', location: 'location', description: 'description' };

const changeFirstPageInputs = async (wrapper) => {
    let inputs = wrapper.find('input');

    await act(async () => inputs.findByTestid('username').props().onChange({ target: { value: user.username }}));
    await act(async () => inputs.findByTestid('email').props().onChange({ target: { value: user.email }}));
    await act(async () => inputs.findByTestid('password').props().onChange({ target: { value: user.password }}));
    await act(async () => inputs.findByTestid('repeatPassword').props().onChange({ target: { value: user.password }}));
    wrapper.update();

    return wrapper.find('input');
}

const changeSecondPageInputs = async (wrapper) => {
    let inputs = wrapper.find('input');
        
    await act(async () => inputs.findByTestid('name').props().onChange({ target: { value: user.name }}));
    await act(async () => inputs.findByTestid('location').props().onChange({ target: { value: user.location }}));
    await act(async () => inputs.findByTestid('description').props().onChange({ target: { value: user.description }}));
    wrapper.update();

    return wrapper.find('input');
}

describe('Register integration tests', () => {
    beforeEach(() => {
        fetch.mockClear();
        jest.spyOn(Router, 'push').mockReturnValue(jest.fn());
    })

    it('should dispatch register return error change to page 0 and display errors', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify(
            { username: 'Username is taken.', email: 'Email is taken.', password: 'Password must be atleast 10 characters.'}), { status: 422 }))

        const wrapper = createWrapper({ isLoading: false, error: null });
        
        await act(async() => wrapper.find('form').props().onSubmit({ preventDefault: jest.fn() }));
        wrapper.update();
       
        await act(async() => wrapper.find('form').props().onSubmit({ preventDefault: jest.fn() }));
        wrapper.update();

        expect(wrapper.findByTestid('usernameError').text()).toBe('Username is taken.')
        expect(wrapper.findByTestid('emailError').text()).toBe('Email is taken.')
        expect(wrapper.findByTestid('passwordError').text()).toBe('Password must be atleast 10 characters.')
    })

    it('should dispatch register return errors with page 1', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify(
            { name: 'You must provide name.', location: 'You must provide location.', description: 'You must provide description.'}), { status: 422 }))

        const wrapper = createWrapper({ isLoading: false, error: null });
        
        await act(async() => wrapper.find('form').props().onSubmit({ preventDefault: jest.fn() }));
        wrapper.update();
        
        await act(async() => wrapper.find('form').props().onSubmit({ preventDefault: jest.fn() }));
        wrapper.update();

        expect(wrapper.findByTestid('nameError').text()).toBe('You must provide name.')
        expect(wrapper.findByTestid('locationError').text()).toBe('You must provide location.')
        expect(wrapper.findByTestid('descriptionError').text()).toBe('You must provide description.')
    })

    it('should change inputs values page 0', async() => {
        const wrapper = createWrapper();

        const inputs = await changeFirstPageInputs(wrapper);

        expect(inputs.findByTestid('username').prop('value')).toBe(user.username);
        expect(inputs.findByTestid('email').prop('value')).toBe(user.email);
        expect(inputs.findByTestid('password').prop('value')).toBe(user.password);
        expect(inputs.findByTestid('repeatPassword').prop('value')).toBe(user.password);
    })

    it('should change inputs values page 1', async() => {
        const wrapper = createWrapper();
        
        await act(async() => wrapper.find('form').props().onSubmit({ preventDefault: jest.fn() }));
        wrapper.update();

        const inputs = await changeSecondPageInputs(wrapper);

        expect(inputs.findByTestid('name').prop('value')).toBe(user.name);
        expect(inputs.findByTestid('location').prop('value')).toBe(user.location);
        expect(inputs.findByTestid('description').prop('value')).toBe(user.description);
    })

    it('should call fetch with data', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({}), { status: 200 }))

        const wrapper = createWrapper({ isLoading: false, error: null });
        
        await changeFirstPageInputs(wrapper);
        await act(async() => wrapper.find('form').props().onSubmit({ preventDefault: jest.fn() }));
        wrapper.update();
        
        await changeSecondPageInputs(wrapper);
        await act(async() => wrapper.find('form').props().onSubmit({ preventDefault: jest.fn()}));

        expect(fetch).toHaveBeenCalledWith('http://localhost:8098/users/register', {body: JSON.stringify(user), headers: {'Content-Type': 'Application/json'}, method: 'POST'})
    })
}); 