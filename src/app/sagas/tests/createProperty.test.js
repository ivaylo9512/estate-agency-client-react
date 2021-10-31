import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { BASE_URL } from 'appConstants';
import createReducer, { onCreatePropertyComplete, onCreatePropertyError } from 'app/slices/createPropertySlice';
import { createProperty } from 'app/sagas/createProperty';
import 'isomorphic-fetch'
import { onLogout } from 'app/slices/authenticateSlice';
import { wrapper } from '..';

jest.mock('next/router', () => ({
    push: jest.fn()
}))

describe('create property saga tests', () => {
    it('should set state on create property request', () => {
        const property = {
            price: 122,
            name: 'property',
            description: 'property'
        }

        return expectSaga(createProperty, { payload: property })
            .withReducer(createReducer)
            .withState({
                isLoading: true,
            })
            .provide([
                [call(fetch, `${BASE_URL}/properties/auth/create`, {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'Application/json',
                        Authorization: null
                    },
                    body: JSON.stringify(property)
                }), new Response(JSON.stringify(property), { status: 200 })]
            ])
            .put(onCreatePropertyComplete(property))
            .hasFinalState({
                isLoading: false,
                error: null,
                property
            })
            .run()
    })

    it('should set error on create property error', () => {
        const error = {
            description: 'You must proved a description',
            price: 'You must provide price.'
        };
        const property = {
            name: 'property',
        }

        return expectSaga(createProperty, { payload: property })
            .withReducer(createReducer)
            .withState({
                isLoading: true,
            })
            .provide([
                [call(fetch, `${BASE_URL}/properties/auth/create`, {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'Application/json',
                        Authorization: null
                    },
                    body: JSON.stringify(property)
                }), new Response(JSON.stringify(error), { status: 422 } )]
            ])
            .put(onCreatePropertyError(error))
            .hasFinalState({
                isLoading: false,
                error,
            })
            .run()
    })

    it('should call logout on create property error with 401', () => {
        const property = {
            name: 'property',
        }

        localStorage.setItem('Authorization', 'token');
        
        return expectSaga(wrapper(createProperty), { payload: property })
            .withReducer(createReducer)
            .provide([
                [call(fetch, `${BASE_URL}/properties/auth/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'Application/json',
                        Authorization: 'Bearer token'
                    },
                    body: JSON.stringify(property)
                }), new Response('jwt expired', { status: 401 })]
            ])
            .put(onLogout('Session has expired.'))
            .run()
    })
})