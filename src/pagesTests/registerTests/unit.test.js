import React from 'react';
import { shallow } from 'enzyme';
import Register from '../../pages/register';
import InputWithError from '../../components/InputWithError';
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
     
        const inputs = wrapper.find(InputWithError);
        expect(inputs.length).toEqual(4);
        expect(wrapper.find('button').text()).toBe('next');

        expect(wrapper.findByTestid('usernameContainer').prop('input').props['data-testid']).toBe('username');
        expect(wrapper.findByTestid('emailContainer').prop('input').props.name).toBe('email');
        expect(wrapper.findByTestid('passwordContainer').prop('input').props.children[0].props.name).toBe('password');
        expect(wrapper.findByTestid('repeatPasswordContainer').prop('input').props.children[0].props.name).toBe('repeatPassword');
    })
    
    it('should render inputs with page 1', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        const buttons = wrapper.find('button');
        const inputs = wrapper.find(InputWithError);

        expect(inputs.length).toEqual(3);
        expect(buttons.at(0).text()).toBe('back');
        expect(buttons.at(1).text()).toBe('register');

        expect(wrapper.findByTestid('nameContainer').prop('input').props.name).toBe('name');
        expect(wrapper.findByTestid('locationContainer').prop('input').props.name).toBe('location');
        expect(wrapper.findByTestid('descriptionContainer').prop('input').props.name).toBe('description');
    })

    it('should render inputs with page 1 when back button is clicked', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });
        
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() })
        wrapper.find('button').at(0).simulate('click', { preventDefault: jest.fn() });

        const inputs = wrapper.find(InputWithError);
        
        expect(inputs.length).toEqual(4);
        expect(wrapper.find('button').text()).toBe('next');
        
        expect(wrapper.findByTestid('usernameContainer').prop('input').props.name).toBe('username');
        expect(wrapper.findByTestid('emailContainer').prop('input').props.name).toBe('email');
        expect(wrapper.findByTestid('passwordContainer').prop('input').props.children[0].props.name).toBe('password');
        expect(wrapper.findByTestid('repeatPasswordContainer').prop('input').props.children[0].props.name).toBe('repeatPassword');
    })

    it('should render with passed error props with page 0', () => {
        const wrapper = createWrapper({ isLoading: false, error: { username: 'Username is already taken.', password: 'Password must be between 10 and 20 characters.', email: 'Email is already taken.' }});
        
        expect(wrapper.findByTestid('usernameContainer').prop('error')).toBe('Username is already taken.');
        expect(wrapper.findByTestid('emailContainer').prop('error')).toBe('Email is already taken.');
        expect(wrapper.findByTestid('passwordContainer').prop('error')).toBe('Password must be between 10 and 20 characters.');
    })

    it('should render with passed error props with page 0', () => {
        const wrapper = createWrapper({isLoading: false, error: {name: 'Name is required.', location: 'location is required.', description: 'Description is required.'}});
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() })
      
        expect(wrapper.findByTestid('nameContainer').prop('error')).toBe('Name is required.');
        expect(wrapper.findByTestid('locationContainer').prop('error')).toBe('location is required.');
        expect(wrapper.findByTestid('descriptionContainer').prop('error')).toBe('Description is required.');
    })

    it('should render redirect', () => {
        const wrapper = createWrapper({ isLoading: false, error: null })

        expect(wrapper.find('span').text()).toBe('Already have an account?<Link />');
        expect(wrapper.find(Link).prop('href')).toBe('/login')
    })
});