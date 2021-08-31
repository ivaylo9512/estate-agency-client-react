import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { register } from 'app/sagas/register';
import { BASE_URL } from 'appConstants';
import authenticateReducer, { onRegisterComplete, onRegisterError } from 'app/slices/authenticateSlice';
import 'isomorphic-fetch'

jest.mock('next/router', () => ({
    push: jest.fn()
}))

describe('register saga tests', () => {
    it('should register and update state', () => {
        const payload = {
            username: 'username',
            password: 'password'
        }

        return expectSaga(register, { payload })
            .withReducer(authenticateReducer)
            .provide([
                [call(fetch, `${BASE_URL}/users/register`, {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'Application/json',
                    },
                    body: JSON.stringify(payload)
                }), new Response(JSON.stringify({ id: 42, username: 'username' }), { status: 200 })],
            ])
            .put(onRegisterComplete({ id: 42, username: 'username' }))
            .hasFinalState({
                isAuth: true,
                user: {
                    id: 42,
                    username: 'username'
                },
                registerRequest: {
                    isLoading: false,
                    error: null
                },
                loginRequest: {
                    isLoading: false,
                    error: null
                }
              })
            .run()
    })

    it('should update state on register error', () => {
        const payload = {
            username: 'username',
            password: 'password'
        }
        const error = { 
            username: 'username is already taken.', 
            email: 'email is aleady taken' 
        }
        return expectSaga(register, { payload })
            .withReducer(authenticateReducer)
            .provide([
                [call(fetch, `${BASE_URL}/users/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'Application/json',
                    },
                    body: JSON.stringify(payload)
                }), new Response(JSON.stringify(error), { status: 422 })],
            ])
            .put(onRegisterError(error))
            .hasFinalState({
                isAuth: false,
                user: null,
                registerRequest: {
                    isLoading: false,
                    error
                },
                loginRequest: {
                    isLoading: false,
                    error: null
                }
              })
            .run()
    })
})