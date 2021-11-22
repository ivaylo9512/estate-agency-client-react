import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { deleteProperty } from 'app/sagas/delete';
import { BASE_URL } from 'appConstants';
import deleteReducer, { onDeleteComplete, onDeleteError } from 'app/slices/deleteSlice';
import 'isomorphic-fetch'
import { wrapper } from '..';
import { onLogout } from 'app/slices/authenticateSlice';

describe('delete property saga tests', () => {
    it('should set state on delete request', () => {
        const id = 2;

        return expectSaga(deleteProperty, { payload: id })
            .withReducer(deleteReducer)
            .withState({
                data: {
                    2: {
                        isLoading: true
                    }
                }
            })
            .provide([
                [call(fetch, `${BASE_URL}/properties/auth/delete/2`, {
                    method: 'DELETE',
                    headers:{
                        Authorization: null
                    }
                }), new Response('done', { status: 200 })]
            ])
            .put(onDeleteComplete(id))
            .hasFinalState({
                data: {
                    2: {
                        isLoading: false,
                        isDeleted: true
                    }
                }
            })
            .run()
    })

    it('should set error on delete request error', () => {
        const id = 2;
        const error = 'Property not found.';

        return expectSaga(deleteProperty, { payload: id })
            .withReducer(deleteReducer)
            .withState({
                data: {
                    2: {
                        isLoading: true
                    }
                }
            })
            .provide([
                [call(fetch, `${BASE_URL}/properties/auth/delete/2`, {
                    method: 'DELETE',
                    headers:{
                        Authorization: null
                    }
                }), new Response(error, { status: 404 } )]
            ])
            .put(onDeleteError({ id, error }))
            .hasFinalState({
                data: {
                    2: {
                        isLoading: false,
                        error
                    }
                }
            })
            .run()
    })

    it('should call logout on delete error with 401', () => {
        const id = 2;

        localStorage.setItem('Authorization', 'token');
        return expectSaga(wrapper(deleteProperty), { payload: id })
            .withReducer(deleteReducer)
            .provide([
                [call(fetch, `${BASE_URL}/properties/auth/delete/2`, {
                    method: 'DELETE',
                    headers:{
                        Authorization: 'Bearer token'
                    }
                }), new Response('jwt expired', { status: 401 })]
            ])
            .put(onLogout('Session has expired.'))
            .run()
    })
})