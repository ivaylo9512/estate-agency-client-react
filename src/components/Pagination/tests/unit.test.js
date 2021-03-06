import { shallow } from 'enzyme';
import Pagination from 'components/Pagination/PropertiesPagination';
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
        dispatchMock.mockClear();
        selectorSpy = jest.spyOn(redux, 'useSelector');
        jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatchMock);
    })

    it('should render 5 Li pages', () => {
        const wrapper = createWrapper({dataInfo: { data: [], pages: 5, maxPages: 5}, query: { take: 2, name: '' }});

        expect(wrapper.find('li').length).toBe(5);
    })

    it('should render 5 Li pages when page exceed pagesPerSlice', () => {
        const wrapper = createWrapper({dataInfo: { data: [], pages: 5, maxPages: 5}, query: { take: 2, name: '' }});

        expect(wrapper.find('li').length).toBe(5);
    })

    
    it('should not render back button at 1st page', () => {
        const wrapper = createWrapper({dataInfo: { data: [], pages: 5, maxPages: 5}, query: { take: 2, name: '' }});

        expect(wrapper.findByTestid('back').length).toBe(0);
    })

    it('should not render next button at last page', () => {
        const wrapper = createWrapper({dataInfo: { data: [], pages: 5, maxPages: 5}, query: { take: 2, name: '' }});
        wrapper.findByTestid(5).props().onClick();

        expect(wrapper.findByTestid('next').length).toBe(0);
    })

    it('should render 6 Li with 5 pages of next slide when last page of slide is clicked pages', () => {
        const wrapper = createWrapper({dataInfo: { data: [], pages: 10, maxPages: 10}, query: { take: 2, name: '' }});
        wrapper.findByTestid(5).props().onClick();

        expect(wrapper.find('li').length).toBe(6);
        expect(wrapper.findByTestid('4').length).toBe(0);
        expect(wrapper.findByTestid('5').length).toBe(1);
        expect(wrapper.findByTestid('6').length).toBe(1);
    })


    it('should dispatch getChats', () => {
        const wrapper = createWrapper({dataInfo: { data: [], pages: 1, maxPages: 5}, query: { take: 2, name: '' }});

        wrapper.findByTestid(2).at(0).props().onClick();

        expect(dispatchMock).toHaveBeenCalledWith(getProperties({take: 2, name: '', pages: 1}));
    })

    it('should dispatch getChats with next button', () => {
        const wrapper = createWrapper({dataInfo: { data: [['data1']], pages: 1, maxPages: 5}, query: { take: 2, name: '' }});

        wrapper.findByTestid('next').props().onClick();

        expect(dispatchMock).toHaveBeenCalledWith(getProperties({take: 2, name: '', pages: 1}));
    })

    it('should dispatch setChats with back button', () => {
        const wrapper = createWrapper({dataInfo: { data: [['data1'], ['data2']], pages: 2, maxPages: 5}, query: { take: 2, name: '' }});

        wrapper.findByTestid(2).at(0).props().onClick();
        wrapper.findByTestid('back').props().onClick();

        expect(dispatchMock).toHaveBeenCalledWith(setCurrentProperties({ currentData: ['data1'], currentPage: 1 }));
    })

    it('should dispatch setChats', () => {
        const wrapper = createWrapper({dataInfo: { data: [['data1'], ['data2']], pages: 2, maxPages: 5}, query: { take: 2, name: '' }});

        wrapper.findByTestid(2).at(0).props().onClick();

        expect(dispatchMock).toHaveBeenCalledWith(setCurrentProperties({ currentData: ['data2'], currentPage: 2 }));
    })

    it('should dispatch getChats with 4 pages when at 1st page and requesting 5th page', () => {
        const wrapper = createWrapper({dataInfo: { data: [['data1']], pages: 1, maxPages: 5}, query: { take: 2, name: '' }});

        wrapper.findByTestid(5).at(0).props().onClick();

        expect(dispatchMock).toHaveBeenCalledWith(getProperties({take: 2, name: '', pages: 4}));
    })

    it('should dispatch getChats with 3 pages when rquesting 5th at 1st page and 2nd page is already present', () => {
        const wrapper = createWrapper({dataInfo: { data: [['data1'], ['data2']], pages: 2, maxPages: 5}, query: { take: 2, name: '' }});

        wrapper.findByTestid(5).at(0).props().onClick();

        expect(dispatchMock).toHaveBeenCalledWith(getProperties({take: 2, name: '', pages: 3}));
    })

    it('should dispatch getChats with 2 pages when rquesting 5th at 1st page and 3 page is already present', () => {
        const wrapper = createWrapper({dataInfo: { data: [['data1'], ['data2'], ['data3']], pages: 3, maxPages: 5}, query: { take: 2, name: '' }});

        wrapper.findByTestid(5).at(0).props().onClick();

        expect(dispatchMock).toHaveBeenCalledWith(getProperties({take: 2, name: '', pages: 2}));
    })

    it('should dispatch getChats with 2 pages when rquesting 5th at 1st page and 3 page is already present', () => {
        const wrapper = createWrapper({dataInfo: { data: [['data1'], ['data2'], ['data3']], pages: 3, maxPages: 5}, query: { take: 2, name: '' }});

        wrapper.findByTestid(5).at(0).props().onClick();

        expect(dispatchMock).toHaveBeenCalledWith(getProperties({take: 2, name: '', pages: 2}));
    })
})