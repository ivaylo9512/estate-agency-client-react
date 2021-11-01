import { expectSaga } from 'redux-saga-test-plan';
import { call, select } from 'redux-saga/effects';
import { BASE_URL } from 'appConstants';
import propertiesReducer, { onUserPropertiesComplete, onUserPropertiesError, getUserPropertiesData } from 'app/slices/userPropertiesPaginationSlice';
import { getProperties } from 'app/sagas/userPropertiesPagination';
import { wrapper } from 'app/sagas'
import 'isomorphic-fetch'
import { onLogout } from 'app/slices/authenticateSlice';

describe('user properties saga tests', () => {
    it('should set state with split array with query take on user properties request', () => {
        const lastData = {
            id: 3, 
            name: 'testC'
        }

        const currentData = [ { id: 2, name: 'testA' }, { id: 5, name: 'testB' }, lastData ];

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
            pages: 2,
            take: 3,
            direction: 'ASC',
            name: 'test',
        }

        const pageable = {
            data: [{ id: 4, name: 'testD' }, { id: 7, name: 'testE' }, { id: 9, name: 'testF' }, 
                { id: 12, name: 'testG' }, { id: 13, name: 'testH' }, { id: 14, name: 'testJ' }],
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
                [call(fetch, `${BASE_URL}/properties/auth/findUserProperties/${query.take * query.pages}/${lastData.id}/undefined/${query.direction}/${query.name}`,{
                    headers:{
                        Authorization: null
                    }
                }), new Response(JSON.stringify(pageable), { status: 200 })],
                [select(getUserPropertiesData), state.dataInfo]
            ])
            .put(onUserPropertiesComplete(completePayload))
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

    it('should set state with initial state', () => {
        const query = {
            pages: 2,
            take: 3,
            direction: 'ASC',
            name: 'test',
        }

        const pageable = {
            data: [{ id: 4, name: 'testD' }, { id: 7, name: 'testE' }, { id: 9, name: 'testF' }, 
                { id: 12, name: 'testG' }, { id: 13, name: 'testH' }, { id: 14, name: 'testJ' }],
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
                [call(fetch, `${BASE_URL}/properties/auth/findUserProperties/${query.take * query.pages}/0/undefined/${query.direction}/${query.name}`,{
                    headers:{
                        Authorization: null
                    }
                }), new Response(JSON.stringify(pageable), { status: 200 })],
                [select(getUserPropertiesData), { dataInfo: { lastData: null }}]
            ])
            .put(onUserPropertiesComplete(completePayload))
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

    it('should set state wihtout query name', () => {
        const lastData = {
            id: 3, 
            name: 'testC'
        }

        const currentData = [ { id: 2, name: 'testA' }, { id: 5, name: 'testB' }, lastData ];

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
            pages: 2,
            take: 3,
            direction: 'ASC',
            name: '',
        }

        const pageable = {
            data: [{ id: 4, name: 'testD' }, { id: 7, name: 'testE' }, { id: 9, name: 'testF' }, 
                { id: 12, name: 'testG' }, { id: 13, name: 'testH' }, { id: 14, name: 'testJ' }],
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
                [call(fetch, `${BASE_URL}/properties/auth/findUserProperties/${query.take * query.pages}/${lastData.id}/testC/${query.direction}/`,{
                    headers:{
                        Authorization: null
                    }
                }), new Response(JSON.stringify(pageable), { status: 200 })],
                [select(getUserPropertiesData), state.dataInfo]
            ])
            .put(onUserPropertiesComplete(completePayload))
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

    it('should set error on user chats request error', () => {
        const error = '0 is not a valid take value';

        const query = {
            pages: 1,
            take: 0,
            name: '',
            direction: 'ASC'
        }

        return expectSaga(getProperties, { payload: query })
            .withReducer(propertiesReducer)
            .provide([
                [call(fetch, `${BASE_URL}/properties/auth/findUserProperties/0/0/undefined/${query.direction}/`, {
                    headers: {
                        Authorization: null
                    }
                }), new Response(error, { status: 422 })],
                [select(getUserPropertiesData), { data: { lastData: null } }]
            ])
            .put(onUserPropertiesError(error))
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
                    name: '',
                },
                isLoading: false,
                isInitial: true,
                error,
            })
            .run()
    })

    it('should call onLogout on users properties error with 401', () => {
        const query = {
            take: 2,
            direction: 'ASC',
            pages: 1
        }

        return expectSaga(wrapper(getProperties), { payload: query })
            .withReducer(propertiesReducer)
            .provide([
                [call(fetch, `${BASE_URL}/properties/auth/findUserProperties/2/0/undefined/${query.direction}/`, {
                    headers: {
                        Authorization: null
                    }
                }), new Response('jwt expired', { status: 401 })],
                [select(getUserPropertiesData), { data: { lastData: null } }]
            ])
            .put(onLogout('Session has expired.'))
            .run()
    })

    it('should set state with reponse with an empty data array', () => {
        const lastData = {
            id: 3, 
            name: 'testC'
        }

        const currentData = [ { id: 2, name: 'testA' }, { id: 5, name: 'testB' }, lastData ];

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
            pages: 2,
            take: 3,
            direction: 'ASC',
            name: 'test',
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
                [call(fetch, `${BASE_URL}/properties/auth/findUserProperties/${query.take * query.pages}/${lastData.id}/undefined/${query.direction}/${query.name}`,{
                    headers:{
                        Authorization: null
                    }
                }), new Response(JSON.stringify(pageable), { status: 200 })],
                [select(getUserPropertiesData), state.dataInfo]
            ])
            .put(onUserPropertiesComplete(completePayload))
            .hasFinalState({
                dataInfo: {
                    pages: 1,
                    maxPages: 1,
                    currentPage: 1,
                    data: [ currentData ],
                    currentData,
                    lastData,
                },
                error: null,
                isLoading: false,
                isInitial: false,
                query
            })
            .run();
    })

    it('should set state with auth token', () => {
        localStorage.setItem('Authorization', 'token')
        const query = {
            pages: 2,
            take: 3,
            direction: 'ASC',
            name: 'test',
        }

        const pageable = {
            data: [{ id: 4, name: 'testD' }, { id: 7, name: 'testE' }, { id: 9, name: 'testF' }, 
                { id: 12, name: 'testG' }, { id: 13, name: 'testH' }, { id: 14, name: 'testJ' }],
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
                [call(fetch, `${BASE_URL}/properties/auth/findUserProperties/${query.take * query.pages}/0/undefined/${query.direction}/${query.name}`,{
                    headers:{
                        Authorization: 'Bearer token'
                    }
                }), new Response(JSON.stringify(pageable), { status: 200 })],
                [select(getUserPropertiesData), { dataInfo: { lastData: null }}]
            ])
            .put(onUserPropertiesComplete(completePayload))
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
})