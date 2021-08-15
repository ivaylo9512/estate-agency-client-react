import React from 'react';
import Register from '../../pages/register';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { getRegisterRequest } from '../../app/slices/authenticate';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(fn => fn()),
    useDispatch: () => jest.fn(),
}));

jest.mock('../../app/slices/authenticate');

const createWrapper = (value) => {
    getRegisterRequest.mockReturnValue(value);
    return shallow(<Register />)
}
describe('RegisterSnapshotTests', () => {
    it('renders correctly page 0', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders correctly page 1', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });

        const form = wrapper.find('form');
        form.simulate('submit', { target: form, preventDefault: jest.fn() });

        expect(toJson(wrapper)).toMatchSnapshot();
    })

    it('renders correctly with passed error props with page 0', () => {
        const wrapper = createWrapper({ isLoading: false, error: { username: 'Username is already taken.', password: 'Password must be between 10 and 20 characters.', email: 'Email is already taken.' }});

        expect(toJson(wrapper)).toMatchSnapshot();
    })

    it('renders correctly with passed error props with page 1', () => {
        const wrapper = createWrapper({ isLoading: false, error: { name: 'Name is required.', location: 'location is required.', description: 'Description is required.' }});

        const form = wrapper.find('form');
        form.simulate('submit', { target: form, preventDefault: jest.fn() });

        expect(toJson(wrapper)).toMatchSnapshot();
    })
})