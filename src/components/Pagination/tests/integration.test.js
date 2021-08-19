import createSaga from 'redux-saga';
import { getDefaultMiddleware, configureStore } from '@reduxjs/toolkit';
import propertiesPagination, { getProperties, getPropertiesState, setCurrentProperties } from 'app/slices/propertiesPaginationSlice';
import PropertiesPaginationWatcher from 'app/sagas/propertiesPagination';
import Pagination from '../PropertiesPagination'
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils'
import 'isomorphic-fetch';

const saga = createSaga();
const middleware = [...getDefaultMiddleware({ thunk: false }), saga];

let id = 0;
const getPropertiesPair = (price = 5) => [{id: id++, price}, {id: id++, price}]

const initialData = getPropertiesPair();
const store = configureStore({
    reducer: {
        propertiesPagination
    },
    middleware,
    preloadedState: {
        propertiesPagination: {
            data: { 
                pages: 1,
                maxPages: 5,
                properties: [initialData],
                lastProperty: initialData[1],
                currentProperties: initialData,
                isLoading: false,
                isInitial: false,
            },
            query: {
                take: 2,
                direction: 'ASC',
                bedrooms: 0,
                location: '',
                maxPrice: 0
            },
            error: null,   
        } 
    }
})

saga.run(function*(){
    yield PropertiesPaginationWatcher
})

global.fetch = jest.fn();

const createWrapper = () => {
    return mount(
        <Provider store={store}>
            <Pagination selector={getPropertiesState} setCurrentProperties={setCurrentProperties} getProperties={getProperties} />
        </Provider>
    )
}

describe('Pagination integration tests', () => {
    it('should should get page 2', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({count: 8, data: getPropertiesPair()}), {status: 200}));
        const wrapper = createWrapper();  

        await act(async() => wrapper.findByTestid(2).simulate('click'));
        const state = store.getState().propertiesPagination;
        wrapper.update();

        expect(state.data.currentProperties).toBe(state.data.properties[1]);
        expect(state.data.maxPages).toBe(5);
        expect(state.data.pages).toBe(2);
    })

    it('should call dispatch with setData when page is already fetched', async() => {
        const wrapper = createWrapper();  

        await act(async() => wrapper.findByTestid(1).simulate('click'));
        const state = store.getState().propertiesPagination;

        expect(state.data.currentProperties).toBe(state.data.properties[0]);
        expect(state.data.maxPages).toBe(5);
        expect(state.data.pages).toBe(2);
    })
})