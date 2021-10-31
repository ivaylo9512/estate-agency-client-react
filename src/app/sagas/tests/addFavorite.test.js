import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { BASE_URL } from 'appConstants';
import favoriteReducer, { onAddFavoriteComplete, onAddFavoriteError } from 'app/slices/toggleFavorite';
import { addFavorite } from 'app/sagas/addFavorite';
import 'isomorphic-fetch'
import { onLogout } from 'app/slices/authenticateSlice';
import { wrapper } from '..';

describe('add favorite saga tests', () => {
    it('should set state on add favorite request', () => {
        const id = 2;

        return expectSaga(addFavorite, { payload: id })
            .withReducer(favoriteReducer)
            .withState({
                data: {
                    2: {
                        isLoading: true
                    }
                }
            })
            .provide([
                [call(fetch, `${BASE_URL}/properties/auth/addFavorite/2`, {
                    method: 'PATCH',
                    headers:{
                        Authorization: null
                    }
                }), new Response('done', { status: 200 })]
            ])
            .put(onAddFavoriteComplete(id))
            .hasFinalState({
                data: {
                    2: {
                        isLoading: false,
                        isFavorite: true,
                        error: null
                    }
                }
            })
            .run()
    })

    it('should set error on add favorite error', () => {
        const id = 2;
        const error = 'Property not found.';

        return expectSaga(addFavorite, { payload: id })
            .withReducer(favoriteReducer)
            .withState({
                data: {
                    2: {
                        isLoading: true
                    }
                }
            })
            .provide([
                [call(fetch, `${BASE_URL}/properties/auth/addFavorite/2`, {
                    method: 'PATCH',
                    headers:{
                        Authorization: null
                    }
                }), new Response(error, { status: 404 } )]
            ])
            .put(onAddFavoriteError({ id, error }))
            .hasFinalState({
                data: {
                    2: {
                        isLoading: false,
                        error,
                        isFavorite: false
                    }
                }
            })
            .run()
    })

    it('should call logout on create property error with 401', () => {
        const id = 2;
        localStorage.setItem('Authorization', 'token');
        
        return expectSaga(wrapper(addFavorite), { payload: id })
            .withReducer(favoriteReducer)
            .provide([
                [call(fetch, `${BASE_URL}/properties/auth/addFavorite/2`, {
                    method: 'PATCH',
                    headers: {
                        Authorization: 'Bearer token'
                    }
                }), new Response('jwt expired', { status: 401 })]
            ])
            .put(onLogout('Session has expired.'))
            .run()
    })
})