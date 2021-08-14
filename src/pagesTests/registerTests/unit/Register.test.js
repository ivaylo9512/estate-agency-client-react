import React from 'react';
import { shallow } from 'enzyme';
import Register from '../../../pages/register';
import { getRegisterRequest } from '../../../app/slices/authenticate';
import InputWithError from '../../../components/InputWithError';
import Link from 'next/link';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(fn => fn()),
    useDispatch: jest.fn()
}));

jest.mock('../../../app/slices/authenticate');

const createWrapper = (value) => {
    getRegisterRequest.mockReturnValue(value);
    return shallow(<Register />)
}

describe('unit tests for Register', () =>{

    it('should render inputs, with page 0', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });
     
        const inputs = wrapper.find(InputWithError);
        expect(wrapper.find(InputWithError).length).toEqual(4);
        expect(wrapper.find('button').text()).toBe('next');

        expect(inputs.at(0).prop('input').props.name).toBe('username');
        expect(inputs.at(1).prop('input').props.name).toBe('email');
        expect(inputs.at(2).prop('input').props.children[0].props.name).toBe('password');
        expect(inputs.at(3).prop('input').props.children[0].props.name).toBe('repeatPassword');
    })

    it('should render inputs with page 1', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });
     
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        const inputs = wrapper.find(InputWithError);
        const buttons = wrapper.find('button');

        expect(wrapper.find(InputWithError).length).toEqual(3);
        expect(buttons.at(0).text()).toBe('back');
        expect(buttons.at(1).text()).toBe('register');

        expect(inputs.at(0).prop('input').props.name).toBe('name');
        expect(inputs.at(1).prop('input').props.name).toBe('location');
        expect(inputs.at(2).prop('input').props.name).toBe('description');
    })

    it('should render inputs with page 1 when back button is clicked', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });
        
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() })
        wrapper.find('button').at(0).simulate('click', { preventDefault: jest.fn() });

        const inputs = wrapper.find(InputWithError);
        expect(wrapper.find(InputWithError).length).toEqual(4);
        expect(wrapper.find('button').text()).toBe('next');
        
        expect(inputs.at(0).prop('input').props.name).toBe('username');
        expect(inputs.at(1).prop('input').props.name).toBe('email');
        expect(inputs.at(2).prop('input').props.children[0].props.name).toBe('password');
        expect(inputs.at(3).prop('input').props.children[0].props.name).toBe('repeatPassword');
    })

    it('should render with passed error props with page 0', () => {
        const wrapper = createWrapper({ isLoading: false, error: { username: 'Username is already taken.', password: 'Password must be between 10 and 20 characters.', email: 'Email is already taken.' }});
        const inputs = wrapper.find(InputWithError);
        
        expect(inputs.at(0).prop('error')).toBe('Username is already taken.');
        expect(inputs.at(1).prop('error')).toBe('Email is already taken.');
        expect(inputs.at(2).prop('error')).toBe('Password must be between 10 and 20 characters.');
    })

    it('should render with passed error props with page 0', () => {
        const wrapper = createWrapper({isLoading: false, error: {name: 'Name is required.', location: 'location is required.', description: 'Description is required.'}});
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() })
      
        const inputs = wrapper.find(InputWithError);
        
        expect(inputs.at(0).prop('error')).toBe('Name is required.');
        expect(inputs.at(1).prop('error')).toBe('location is required.');
        expect(inputs.at(2).prop('error')).toBe('Description is required.');
    })

    it('should render redirect', () => {
        const wrapper = createWrapper({ isLoading: false, error: null })

        const span = wrapper.find('span');
        const link = wrapper.find(Link);

        expect(span.text()).toBe('Already have an account?<Link />');
        expect(link.prop('href')).toBe('/login')
    })
});