import React from 'react';
import Login from '../../pages/login';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { getLoginRequest } from '../../app/slices/authenticate';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(fn => fn()),
    useDispatch: () => jest.fn(),
}));

jest.mock('../../app/slices/authenticate');

const createWrapper = (state) => {
    getLoginRequest.mockReturnValue(state);
    return shallow(<Login /> )
}
describe("Login snapshot tests", () => {
    it('renders correctly', () => {
        const wrapper = createWrapper({isLoading: false, error: null});
     
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders correctly with passed errors props', () => {
        const wrapper = createWrapper({isLoading: false, error: 'Bad credentials.'});

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});