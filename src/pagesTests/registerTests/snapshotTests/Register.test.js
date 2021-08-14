import React from 'react';
import Register from '../../../pages/register';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { getRegisterRequest } from '../../../app/slices/authenticate';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(fn => fn()),
    useDispatch: () => jest.fn(),
}));

jest.mock('../../../app/slices/authenticate');

const createWrapper = (value) => {
    getRegisterRequest.mockReturnValue(value);
    return shallow(<Register />)
}
describe('RegisterSnapshotTests', () => {
    it('renders correctly page 0', () => {
        const wrapper = createWrapper({ isLoading: false, error: null })
        expect(toJson(wrapper)).toMatchSnapshot();
    });
})