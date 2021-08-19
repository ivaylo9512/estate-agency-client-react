import { shallow } from 'enzyme';
import Pagination from '../PropertiesPagination';
import * as redux from 'react-redux';
import { setCurrentProperties, getProperties } from 'app/slices/propertiesPaginationSlice';

describe('Pagination unit tests', () => {
    let selectorSpy;
    let dispatchMock = jest.fn();

    const createWrapper = (value) => {
        selectorSpy.mockReturnValue(value);
    
        return shallow(<Pagination setCurrentProperties={setCurrentProperties} getProperties={getProperties} pagesPerSlide={5}/>)
    }

    beforeEach(() => {
        selectorSpy = jest.spyOn(redux, 'useSelector');
        jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatchMock);
    })

    it('should dispatch getChats', () => {
        const wrapper = createWrapper({data: { properties:[], pages: 1, maxPages: 5}, query: { take: 2, name: '' }});

        wrapper.findByTestid(2).at(0).simulate('click');

        expect(dispatchMock).toHaveBeenCalledWith(getProperties({take: 2, name: '', pages: 1}));
    })

    it('should dispatch setChats', () => {
        const wrapper = createWrapper({data: { properties:[['data1'], ['data2']], pages: 1, maxPages: 5}, query: { take: 2, name: '' }});

        wrapper.findByTestid(2).at(0).simulate('click');

        expect(dispatchMock).toHaveBeenCalledWith(setCurrentProperties(['data2']));
    })

    it('should dispatch getChats with 4 pages when at 1st page and requesting 5th page', () => {
        const wrapper = createWrapper({data: { properties:[['data1']], pages: 1, maxPages: 5}, query: { take: 2, name: '' }});

        wrapper.findByTestid(5).at(0).simulate('click');

        expect(dispatchMock).toHaveBeenCalledWith(getProperties({take: 2, name: '', pages: 4}));
    })

    it('should dispatch getChats with 3 pages when rquesting 5th at 1st page and 2nd page is already present', () => {
        const wrapper = createWrapper({data: { properties:[['data1'], ['data2']], pages: 2, maxPages: 5}, query: { take: 2, name: '' }});

        wrapper.findByTestid(5).at(0).simulate('click');

        expect(dispatchMock).toHaveBeenCalledWith(getProperties({take: 2, name: '', pages: 3}));
    })
})