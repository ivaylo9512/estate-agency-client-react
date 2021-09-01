import reducer, { resetUserPropertiesState, onUserPropertiesComplete, onUserPropertiesError, getUserProperties, setUserPropertiesDirection, setCurrentUserProperties } from 'app/slices/userPropertiesPaginationSlice';

const initialState = {
    dataInfo:{
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
        name: '',
    },
    isLoading: false,
    isInitial: true,
    error: null,
}

describe('user properties slice unit tests', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should update state on user chats request', () => {
        expect(reducer(initialState, getUserProperties())).toEqual({
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
        }

        expect(reducer(state, onUserPropertiesComplete({ pageable, query }))).toEqual({
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
        expect(reducer(state, onUserPropertiesError('error'))).toEqual({
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
        expect(reducer(initialState, setCurrentUserProperties(payload))).toEqual({
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

        expect(reducer(state, setUserPropertiesDirection('DESC'))).toEqual({
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

        expect(reducer(state, resetUserPropertiesState())).toEqual(initialState);
    })
})