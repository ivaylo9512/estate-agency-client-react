import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { getFavorites } from 'app/sagas/favorites';
import { BASE_URL } from 'appConstants';
import favoritesReducer, { onFavoritesComplete, onFavoritesError } from 'app/slices/favoritesSlice';
import 'isomorphic-fetch'

describe('favorites saga tests', () => {
    it('should set state on get favorites', () => {
        const properties = [{ id: 1 }, { id: 2 }, { id: 3 }];

        expectSaga(getFavorites)
            .withReducer(favoritesReducer)
            .withState({
                isLoading: true
            })
            .provide([
                [call(fetch, `${BASE_URL}/properties/getFavorites`), new Response(JSON.stringify(properties), { status: 200 })]
            ])
            .put(onFavoritesComplete(properties))
            .hasFinalState({
                isLoading: false,
                error: null,
                properties
            })
    })

    it('should set error on get favorites error', () => {
        const error = 'Unavailable';

        expectSaga(getFavorites)
            .withReducer(favoritesReducer)
            .withState({
                isLoading: true
            })
            .provide([
                [call(fetch, `${BASE_URL}/properties/getFavorites`), new Response(error, { status: 410 })]
            ])
            .put(onFavoritesError(error))
            .hasFinalState({
                isLoading: false,
                error,
            })
    })
})