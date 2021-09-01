import reducer, { getFavorites, onFavoritesComplete, onFavoritesError, resetFavorites } from 'app/slices/favoritesSlice'

const initialState = {
    favorites: [],
    isLoading: false,
    error: null
}
describe('favorites slice unit tests', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            favorites: [],
            isLoading: false,
            error: null
        })
    })

    it('should set isLoading on get favorites', () => {
        expect(reducer(initialState, getFavorites())).toEqual({
            ...initialState,
            isLoading: true,
            favorites: null
        })
    })

    it('should set favorites on favorites complete', () => {
        const favorites = [{ id: 1}, { id: 2}, { id: 3 }]
        const state = {
            ...initialState,
            isLoading: true
        }
        
        expect(reducer(state, onFavoritesComplete(favorites))).toEqual({
            ...initialState,
            favorites
        })
    })

    it('should set error on favorites error', () => {
        const error = 'Unavailable.'
        const state = {
            ...initialState,
            isLoading: true
        }

        expect(reducer(state, onFavoritesError(error))).toEqual({
            ...initialState,
            error
        })
    })

    it('should reset state', () => {
        const state = {
            favorites: [{ id: 1}, { id: 2}, { id: 3 }],
            error: 'Unavailable',
            isLoading: true
        }

        expect(reducer(state, resetFavorites())).toEqual(initialState);
    })
})