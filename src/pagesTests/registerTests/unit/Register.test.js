import React from 'react';
import { shallow } from 'enzyme';
import Register from '../../../pages/register';
import { getRegisterRequest } from '../../../app/slices/authenticate';
import InputWithError from '../../../components/InputWithError';

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
        expect(inputs.at(3).prop('input').props.children[0].props.name).toBe('repeat-password');
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

});