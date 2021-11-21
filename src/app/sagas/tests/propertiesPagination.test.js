import { expectSaga } from 'redux-saga-test-plan';
import { call, select } from 'redux-saga/effects';
import { BASE_URL } from 'appConstants';
import propertiesReducer, { onPropertiesComplete, onPropertiesError, getPropertiesData } from 'app/slices/propertiesPaginationSlice';
import { getProperties } from 'app/sagas/propertiesPagination';
import 'isomorphic-fetch'

describe('properties saga tests', () => {
    it('should set state with split array by query take on properties request', () => {
        const lastData = {
            id: 3, 
            price: 8
        }

        const currentData = [ { id: 2, price: 3 }, { id: 5, price: 6}, lastData ];

        const state = {
            dataInfo: {
                pages: 1,
                maxPages: 2,
                data: [ currentData ],
                lastData,
                currentData,
                currentPage: 1
            },
            query: {
                take: 3,
                direction: 'ASC',
            },
            isLoading: true,
            error: null
        }

        const query = {
            take: 3,
            direction: 'ASC',
            pages: 2,
            bedrooms: 5,
            location: 'Sofia',
            maxPrice: 40,
        }

        const pageable = {
            data: [{ id: 4, price: 9 }, { id: 7, price: 12 }, { id: 9, price: 15 }, 
                { id: 12, price: 20 }, { id: 13, price: 25 }, { id: 14, price: 30 }],
            count: 12
        }

        const newLastData = pageable.data[5];
        const completePayload = {
            pageable: {
                data: [[ pageable.data[0], pageable.data[1], pageable.data[2] ], 
                    [ pageable.data[3], pageable.data[4], pageable.data[5] ]],
                lastProperty: newLastData,
                pages: 4,
                count: 12
            },
            query
        }

        return expectSaga(getProperties, { payload: query })
            .withReducer(propertiesReducer)
            .withState(state)
            .provide([
                [call(fetch, `${BASE_URL}/properties/findByWithPage/${query.take * query.pages}/${query.location}/${query.bedrooms}/${lastData.price}/${query.maxPrice}/${lastData.id}/${query.direction}`), 
                    new Response(JSON.stringify(pageable), { status: 200 })
                ],
                [select(getPropertiesData), state.dataInfo]
            ])
            .put(onPropertiesComplete(completePayload))
            .hasFinalState({
                dataInfo: {
                    pages: 3,
                    maxPages: 5,
                    currentPage: 3,
                    data: [...state.dataInfo.data, ...completePayload.pageable.data],
                    currentData: completePayload.pageable.data[1],
                    lastData: newLastData,
                },
                error: null,
                isLoading: false,
                isInitial: false,
                query
            })
            .run();
    })

    it('should set error on properties request error', () => {
        const error = '0 is not a valid take value';

        const query = {
            take: 0,
            direction: 'ASC',
            pages: 2,
            bedrooms: 5,
            location: 'Sofia',
            maxPrice: 40,
        }

        return expectSaga(getProperties, { payload: query })
            .withReducer(propertiesReducer)
            .provide([
                [call(fetch, `${BASE_URL}/properties/findByWithPage/0/${query.location}/${query.bedrooms}/undefined/${query.maxPrice}/0/ASC`), new Response(error, { status: 422 })],
                [select(getPropertiesData), { data: { lastData: null } }]
            ])
            .put(onPropertiesError(error))
            .hasFinalState({
                dataInfo: {
                    pages: 0,
                    maxPages: 0,
                    data: [],
                    lastData: null,
                    currentData: null,
                    currentPage: 0
                },
                query: {
                    take: 2,
                    direction: 'ASC',
                    location: '',
                    bedrooms: 0,
                    maxPrice: 0
                },
                isLoading: false,
                isInitial: true,
                error,
            })
            .run()
    })

    it('should set state with initial state', () => {
        const query = {
            take: 3,
            direction: 'ASC',
            pages: 2,
            bedrooms: 5,
            location: 'Sofia',
            maxPrice: 40,
        }

        const pageable = {
            data: [{ id: 4, price: 9 }, { id: 7, price: 12 }, { id: 9, price: 15 }, 
                { id: 12, price: 20 }, { id: 13, price: 25 }, { id: 14, price: 30 }],
            count: 12
        }

        const lastData = pageable.data[5];
        const completePayload = {
            pageable: {
                data: [[ pageable.data[0], pageable.data[1], pageable.data[2] ], 
                    [ pageable.data[3], pageable.data[4], pageable.data[5] ]],
                lastProperty: lastData,
                pages: 4,
                count: 12
            },
            query
        }

        return expectSaga(getProperties, { payload: query })
            .withReducer(propertiesReducer)
            .provide([
                [call(fetch, `${BASE_URL}/properties/findByWithPage/${query.take * query.pages}/${query.location}/${query.bedrooms}/undefined/${query.maxPrice}/0/${query.direction}`), 
                    new Response(JSON.stringify(pageable), { status: 200 })
                ],
                [select(getPropertiesData), { dataInfo: { currentData: null }}]
            ])
            .put(onPropertiesComplete(completePayload))
            .hasFinalState({
                dataInfo: {
                    pages: 2,
                    maxPages: 4,
                    currentPage: 2,
                    data: completePayload.pageable.data,
                    currentData: completePayload.pageable.data[1],
                    lastData,
                },
                error: null,
                isLoading: false,
                isInitial: false,
                query
            })
            .run();
    })

    it('should call fetch with params when query direction is DESC', () => {
        const lastData = {
            id: 3, 
            price: 8
        }

        const currentData = [ { id: 2, price: 3 }, { id: 5, price: 6}, lastData ];

        const state = {
            dataInfo: {
                pages: 1,
                maxPages: 2,
                data: [ currentData ],
                lastData,
                currentData,
                currentPage: 1
            },
            query: {
                take: 3,
                direction: 'ASC',
            },
            isLoading: true,
            error: null
        }

        const query = {
            take: 3,
            direction: 'DESC',
            pages: 2,
            bedrooms: 5,
            location: 'Sofia',
            maxPrice: 40,
        }

        const pageable = {
            data: [{ id: 4, price: 9 }, { id: 7, price: 12 }, { id: 9, price: 15 }, 
                { id: 12, price: 20 }, { id: 13, price: 25 }, { id: 14, price: 30 }],
            count: 12
        }

        const newLastData = pageable.data[5];
        const completePayload = {
            pageable: {
                data: [[ pageable.data[0], pageable.data[1], pageable.data[2] ], 
                    [ pageable.data[3], pageable.data[4], pageable.data[5] ]],
                lastProperty: newLastData,
                pages: 4,
                count: 12
            },
            query
        }

        return expectSaga(getProperties, { payload: query })
            .withReducer(propertiesReducer)
            .withState(state)
            .provide([
                [call(fetch, `${BASE_URL}/properties/findByWithPage/${query.take * query.pages}/${query.location}/${query.bedrooms}/undefined/${lastData.price}/${lastData.id}/${query.direction}`), 
                    new Response(JSON.stringify(pageable), { status: 200 })
                ],
                [select(getPropertiesData), state.dataInfo]
            ])
            .put(onPropertiesComplete(completePayload))
            .hasFinalState({
                dataInfo: {
                    pages: 3,
                    maxPages: 5,
                    currentPage: 3,
                    data: [...state.dataInfo.data, ...completePayload.pageable.data],
                    currentData: completePayload.pageable.data[1],
                    lastData: newLastData,
                },
                error: null,
                isLoading: false,
                isInitial: false,
                query
            })
            .run();
    })

    it('should set state when response has an empty data array', () => {
        const lastData = {
            id: 3, 
            price: 8
        }

        const currentData = [ { id: 2, price: 3 }, { id: 5, price: 6}, lastData ];

        const state = {
            dataInfo: {
                pages: 1,
                maxPages: 2,
                data: [ currentData ],
                lastData,
                currentData,
                currentPage: 1
            },
            query: {
                take: 3,
                direction: 'ASC',
            },
            isLoading: true,
            error: null
        }

        const query = {
            take: 3,
            direction: 'ASC',
            pages: 2,
            bedrooms: 5,
            location: 'Sofia',
            maxPrice: 40,
        }

        const pageable = {
            data: [],
            count: 0
        }

        const completePayload = {
            pageable: {
                data: [],
                lastProperty: lastData,
                pages: 0,
                count: 0
            },
            query
        }

        return expectSaga(getProperties, { payload: query })
            .withReducer(propertiesReducer)
            .withState(state)
            .provide([
                [call(fetch, `${BASE_URL}/properties/findByWithPage/${query.take * query.pages}/${query.location}/${query.bedrooms}/${lastData.price}/${query.maxPrice}/${lastData.id}/${query.direction}`), 
                    new Response(JSON.stringify(pageable), { status: 200 })
                ],
                [select(getPropertiesData), state.dataInfo]
            ])
            .put(onPropertiesComplete(completePayload))
            .hasFinalState({
                dataInfo: {
                    pages: 1,
                    maxPages: 1,
                    currentPage: 1,
                    data: [ currentData ],
                    currentData: currentData,
                    lastData,
                },
                error: null,
                isLoading: false,
                isInitial: false,
                query
            })
            .run();
    })
})