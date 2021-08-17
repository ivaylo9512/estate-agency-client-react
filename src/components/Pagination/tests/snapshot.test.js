import React from 'react';
import { shallow } from 'enzyme';
import Pagination from '../PropertiesPagination';
import * as redux from 'react-redux';

describe('Pagination snpashot tests', () => {
    let selectorMock;

    beforeAll(() => {
        selectorMock = jest.spyOn(redux, 'useSelector');
        jest.spyOn(redux, 'useDispatch').mockReturnValue(jest.fn());
    })

    const createWrapper = (state) => {
        selectorMock.mockReturnValue(state);

        return shallow(<Pagination data={[]} />)
    }

    it('renders correctly with pages', () => {
        const wrapper = createWrapper({ data: { maxPages: 5, isLoading: false}, query: { name: '', take: '10'}});

        expect(wrapper).toMatchSnapshot();
    })

    it('renders correctly without pages', () => {
        const wrapper = createWrapper({ data: { maxPages: 0, isLoading: false}, query: { name: '', take: '10'}});

        expect(wrapper).toMatchSnapshot();
    })

    it('renders correctly with pages and back button', () => {
        const wrapper = createWrapper({ data: { maxPages: 5, isLoading: false}, query: { name: '', take: '10'}});
        wrapper.findByTestid(1).simulate('click');

        expect(wrapper).toMatchSnapshot();
    })

})