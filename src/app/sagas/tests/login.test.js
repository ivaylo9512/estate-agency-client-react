import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { login } from 'app/sagas/login';
import { BASE_URL } from 'appConstants';
import authenticateReducer, { onLoginComplete, onLoginError } from 'app/slices/authenticateSlice';
import 'isomorphic-fetch'

jest.mock('next/router', () => ({
    push: jest.fn()
}))

describe('login saga tests', () => {
    it('should login and update state', () => {
        const payload = {
            username: 'username',
            password: 'password'
        }
        return expectSaga(login, { payload })
            .withReducer(authenticateReducer)
            .provide([
                [call(fetch, `${BASE_URL}/users/login`, {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'Application/json',
                    },
                    body: JSON.stringify(payload)
                }), new Response(JSON.stringify({ id: 42, username: 'username' }), { status: 200 })],
            ])
            .put(onLoginComplete({ id: 42, username: 'username' }))
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

    it('should update state on login error', () => {
        const payload = {
            username: 'username',
            password: 'password'
        }
        return expectSaga(login, { payload })
            .withReducer(authenticateReducer)
            .provide([
                [call(fetch, `${BASE_URL}/users/login`, {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'Application/json',
                    },
                    body: JSON.stringify(payload)
                }), new Response('Bad credentials.', { status: 401 })],
            ])
            .put(onLoginError('Bad credentials.'))
            .hasFinalState({
                isAuth: false,
                user: null,
                registerRequest: {
                    isLoading: false,
                    error: null
                },
                loginRequest: {
                    isLoading: false,
                    error: 'Bad credentials.'
                }
              })
            .run()
    })
})