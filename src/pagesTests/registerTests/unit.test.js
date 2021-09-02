import React from 'react';
import { shallow } from 'enzyme';
import Register from 'pages/register';
import InputWithError from 'components/InputWithError';
import Link from 'next/link';
import * as redux from 'react-redux';

describe('unit tests for Register', () => {
    let selectorSpy;
    let dispatchSpy;

    beforeAll(() => {
        selectorSpy = jest.spyOn(redux, 'useSelector');
        dispatchSpy = jest.spyOn(redux, 'useDispatch');

        dispatchSpy.mockReturnValue(jest.fn());
    })
    const createWrapper = (state) => {
        selectorSpy.mockReturnValue(state);
        
        return shallow(
            <Register /> 
        )
    }

    it('should render inputs, with page 0', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });

        expect(wrapper.find(InputWithError).length).toEqual(4);
        expect(wrapper.findByTestid('usernameContainer').length).toBe(1);
        expect(wrapper.findByTestid('emailContainer').length).toBe(1);
        expect(wrapper.findByTestid('passwordContainer').length).toBe(1);
        expect(wrapper.findByTestid('repeatPasswordContainer').length).toBe(1);
    })
    
    it('should render inputs with page 1', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        expect(wrapper.find(InputWithError).length).toEqual(3);
        expect(wrapper.findByTestid('nameContainer').length).toBe(1);
        expect(wrapper.findByTestid('locationContainer').length).toBe(1);
        expect(wrapper.findByTestid('descriptionContainer').length).toBe(1);
    })

    it('should render inputs with page 0 when back button is clicked', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });
        
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() })
        wrapper.findByTestid('back').simulate('click', { preventDefault: jest.fn() });

        expect(wrapper.findByTestid('usernameContainer').length).toBe(1);
        expect(wrapper.findByTestid('emailContainer').length).toBe(1);
        expect(wrapper.findByTestid('passwordContainer').length).toBe(1);
        expect(wrapper.findByTestid('repeatPasswordContainer').length).toBe(1);
    })

    it('should render with passed error props with page 0', () => {
        const wrapper = createWrapper({ isLoading: false, error: { username: 'Username is already taken.', password: 'Password must be between 10 and 20 characters.', email: 'Email is already taken.' }});
        
        expect(wrapper.findByTestid('usernameContainer').prop('error')).toBe('Username is already taken.');
        expect(wrapper.findByTestid('emailContainer').prop('error')).toBe('Email is already taken.');
        expect(wrapper.findByTestid('passwordContainer').prop('error')).toBe('Password must be between 10 and 20 characters.');
    })

    it('should render with passed error props with page 1', () => {
        const wrapper = createWrapper({isLoading: false, error: {name: 'Name is required.', location: 'location is required.', description: 'Description is required.'}});
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() })
      
        expect(wrapper.findByTestid('nameContainer').prop('error')).toBe('Name is required.');
        expect(wrapper.findByTestid('locationContainer').prop('error')).toBe('location is required.');
        expect(wrapper.findByTestid('descriptionContainer').prop('error')).toBe('Description is required.');
    })

    it('should render button page 0', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });

        expect(wrapper.findByTestid('next').prop('type')).toBe('submit');
    })

    it('should render buttons with page 1', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        expect(wrapper.findByTestid('back').length).toBe(1);
        expect(wrapper.findByTestid('register').prop('type')).toBe('submit');
    })

    it('should render redirect', () => {
        const wrapper = createWrapper({ isLoading: false, error: null })
        const redirect = wrapper.findByTestid('redirect');

        expect(redirect.text()).toBe('Already have an account?<Link />');
        expect(redirect.find(Link).prop('href')).toBe('/login')
    })
});