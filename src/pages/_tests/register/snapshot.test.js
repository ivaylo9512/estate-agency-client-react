import React from 'react';
import Register from 'pages/register';
import { shallow } from 'enzyme';
import * as redux from 'react-redux';

describe('RegisterSnapshotTests', () => {
    let selectorSpy;

    beforeAll(() => {
        selectorSpy = jest.spyOn(redux, 'useSelector');
        
        jest.spyOn(redux, 'useDispatch').mockReturnValue(jest.fn());
    })

    const createWrapper = (state) => {
        selectorSpy.mockReturnValue(state);
        
        return shallow(
            <Register /> 
        )
    }

    it('renders correctly page 0', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });
        expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly page 1', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });

        const form = wrapper.find('form');
        form.simulate('submit', { target: form, preventDefault: jest.fn() });

        expect(wrapper).toMatchSnapshot();
    })

    it('renders correctly with passed error props with page 0', () => {
        const wrapper = createWrapper({ isLoading: false, error: { username: 'Username is already taken.', password: 'Password must be between 10 and 20 characters.', email: 'Email is already taken.' }});

        expect(wrapper).toMatchSnapshot();
    })

    it('renders correctly with passed error props with page 1', () => {
        const wrapper = createWrapper({ isLoading: false, error: { name: 'Name is required.', location: 'location is required.', description: 'Description is required.' }});

        const form = wrapper.find('form');
        form.simulate('submit', { target: form, preventDefault: jest.fn() });

        expect(wrapper).toMatchSnapshot();
    })
})