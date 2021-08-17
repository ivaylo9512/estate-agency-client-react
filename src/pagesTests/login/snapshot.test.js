import React from 'react';
import Login from '../../pages/login';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as redux from 'react-redux';

describe("Login snapshot tests", () => {
    let selectorSpy;

    beforeAll(() => {
        selectorSpy = jest.spyOn(redux, 'useSelector');
    
        const spyOnUseDispatch = jest.spyOn(redux, 'useDispatch');
        spyOnUseDispatch.mockReturnValue(jest.fn());
    });

    const createWrapper = (state) => {
        selectorSpy.mockReturnValue(state);
        return shallow(
            <Login />
        )
    }

    it('renders correctly', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });
     
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders correctly with passed errors props', () => {
        const wrapper = createWrapper({ isLoading: false, error: 'Bad credentials.' });

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});