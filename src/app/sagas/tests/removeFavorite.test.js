import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { BASE_URL } from 'appConstants';
import favoriteReducer, { onRemoveFavoriteComplete, onRemoveFavoriteError } from 'app/slices/toggleFavorite';
import { removeFavorite } from 'app/sagas/removeFavorite';
import 'isomorphic-fetch'
import { wrapper } from '..';
import { onLogout } from 'app/slices/authenticateSlice';

describe('remove favorite saga tests', () => {
    it('should set state on remove favorite request', () => {
        const id = 2;

        return expectSaga(removeFavorite, { payload: id })
            .withReducer(favoriteReducer)
            .withState({
                data: {
                    2: {
                        isLoading: true
                    }
                }
            })
            .provide([
                [call(fetch, `${BASE_URL}/properties/auth/removeFavorite/2`, {
                    method: 'PATCH',
                    headers:{
                        Authorization: null
                    }
                }), new Response('done', { status: 200 })]
            ])
            .put(onRemoveFavoriteComplete(id))
            .hasFinalState({
                data: {
                    2: {
                        isLoading: false,
                        isFavorite: false,
                        error: null
                    }
                }
            })
            .run()
    })

    it('should set error on remove favorite error', () => {
        const id = 2;
        const error = 'Property not found.';

        return expectSaga(removeFavorite, { payload: id })
            .withReducer(favoriteReducer)
            .withState({
                data: {
                    2: {
                        isLoading: true
                    }
                }
            })
            .provide([
                [call(fetch, `${BASE_URL}/properties/auth/removeFavorite/2`, {
                    method: 'PATCH',
                    headers:{
                        Authorization: null
                    }
                }), new Response(error, { status: 404 } )]
            ])
            .put(onRemoveFavoriteError({ id, error }))
            .hasFinalState({
                data: {
                    2: {
                        isLoading: false,
                        error,
                        isFavorite: true
                    }
                }
            })
            .run()
    })

    it('should call onLogout on remove favorite error with 401', () => {
        const id = 2;

        localStorage.setItem('Authorization', 'token');
        return expectSaga(wrapper(removeFavorite), { payload: id })
            .withReducer(favoriteReducer)
            .provide([
                [call(fetch, `${BASE_URL}/properties/auth/removeFavorite/2`, {
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