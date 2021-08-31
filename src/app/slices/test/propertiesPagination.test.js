import reducer, { resetPropertiesState, onPropertiesComplete, onPropertiesError, getProperties, setPropertiesDirection, setCurrentProperties } from 'app/slices/propertiesPaginationSlice';

const initialState = {
    dataInfo: {
        pages: 0,
        maxPages: 0,
        data: [],
        lastData: null,
        currentData: null,
        currentPage: 1,
    },
    query: {
        take: 2,
        direction: 'ASC',
        bedrooms: 0,
        location: '',
        maxPrice: 0
    },
    isLoading: false,
    isInitial: true,
    error: null,
}

describe('properties pagination slice unit tests', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should update state on user chats request', () => {
        expect(reducer(initialState, getProperties())).toEqual({
            ...initialState,
            isLoading: true,
        })
    })

    it('should update state on request complete', () => {
        const state = {
            ...initialState,
            isLoading: true,
            dataInfo: {
                data: [
                    [1, 2],
                    [3, 4]
                ],
                pages: 2,
                maxPages: 4,
                currentPage: 2,
                lastData: 4,
                currentData: [3, 4]
            }
        }
        const pageable = { 
            data: [
                [4, 5],
                [6, 7]
            ],
            pages: 2,
            lastProperty: 7
        }

        const query = { 
            take: 6, 
            direction: 'DESC',
            name: 'test',
            bedrooms: 5,
            maxPrice: 200
        }

        expect(reducer(state, onPropertiesComplete({ pageable, query }))).toEqual({
            ...initialState,
            dataInfo: {
                maxPages: 4,
                pages: 4,
                lastData: 7,
                data: [...state.dataInfo.data, ...pageable.data],
                currentData: pageable.data[1],
                currentPage: 4,
            },
            query,
            isLoading: false,
            isInitial: false,
        })
    })

    it('should update state on request error', () => {
        const state = {
            ...initialState,
            isLoading: true
        }
        expect(reducer(state, onPropertiesError('error'))).toEqual({
            ...initialState,
            isLoading: false,
            error: 'error'
        })
    })

    it('should set current users', () => {
        const payload = {
            currentData: [2, 3],
            currentPage: 5
        }

        expect(reducer(initialState, setCurrentProperties(payload))).toEqual({
            ...initialState,
            dataInfo: {
                ...initialState.dataInfo,
                currentData: payload.currentData,
                currentPage: payload.currentPage
            }
        })
    })

    it('should set direction and reset state', () => {
        const state = {
            query: {
                take: 6, 
                direction: 'DESC',
                name: 'test',
                bedrooms: 5,
                maxPrice: 200
            },
            dataInfo: {
                data: [
                    [1, 2],
                    [3, 4]
                ],
                pages: 2,
                maxPages: 4,
                currentPage: 2,
                lastData: 4,
                currentData: [3, 4]
            },
            error: 'error',
            isInitial: false,
            isLoading: true
        }

        expect(reducer(state, setPropertiesDirection('DESC'))).toEqual({
            ...initialState,
            query: {
                ...initialState.query,
                direction: 'DESC'
            }
        });
        
    })

    it('should reset state', () => {
        const state = {
            query: {
                take: 6, 
                direction: 'DESC',
                name: 'test',
                bedrooms: 5,
                maxPrice: 200
            },
            dataInfo: {
                data: [
                    [1, 2],
                    [3, 4]
                ],
                pages: 2,
                maxPages: 4,
                currentPage: 2,
                lastData: 4,
                currentData: [3, 4]
            },
            error: 'error',
            isInitial: false,
            isLoading: true
        }

        expect(reducer(state, resetPropertiesState())).toEqual(initialState);
    })
})