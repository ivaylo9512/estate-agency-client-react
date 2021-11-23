import React from 'react';
import Login from 'pages/login';
import { shallow } from 'enzyme';
import * as redux from 'react-redux';

describe('Login snapshot tests', () => {
    let selectorSpy;

    beforeAll(() => {
        jest.spyOn(redux, 'useDispatch').mockReturnValue(jest.fn());
      
        selectorSpy = jest.spyOn(redux, 'useSelector');
    });

    const createWrapper = (state) => {
        selectorSpy.mockReturnValue(state);

        return shallow(
            <Login />
        )
    }

    it('renders correctly', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });
     
        expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly with passed errors props', () => {
        const wrapper = createWrapper({ isLoading: false, error: 'Bad credentials.' });

        expect(wrapper).toMatchSnapshot();
    });
});