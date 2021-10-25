import reducer, { addFavorite, removeFavorite, onAddFavoriteComplete, onAddFavoriteError, onRemoveFavoriteComplete, onRemoveFavoriteError, resetToggleFavoriteState } from 'app/slices/toggleFavorite'

const initialState = {
    data: {}
}

describe('toggleFavorite slice unit tests', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    })

    it('should set state on add favorite', () => {
        expect(reducer(initialState, addFavorite(5))).toEqual({
            data: {
                5: {
                    isLoading: true,
                    error: null
                }
            }
        });
    })

    
    it('should set state on remove favorite', () => {
        expect(reducer(initialState, removeFavorite(5))).toEqual({
            data: {
                5: {
                    isLoading: true,
                    error: null
                }
            }
        });
    })

    it('should set state on add favorite complete', () => {
        const state = {
            data: {
                5: {
                    isLoading: true,
                    error: null
                }
            }
        }
        expect(reducer(state, onAddFavoriteComplete(5))).toEqual({
            data: {
                5: {
                    isLoading: false,
                    error: null,
                    isFavorite: true
                }
            }
        });
    })

    it('should set state on add favorite error', () => {
        const state = {
            data: {
                5: {
                    isLoading: true,
                    error: null
                }
            }
        }
        expect(reducer(state, onAddFavoriteError({ id: 5, error: 'Error' }))).toEqual({
            data: {
                5: {
                    isLoading: false,
                    error: 'Error',
                    isFavorite: false
                }
            }
        });
    })

    it('should set state on remove favorite complete', () => {
        const state = {
            data: {
                5: {
                    isLoading: true,
                    error: null
                }
            }
        }
        expect(reducer(state, onRemoveFavoriteComplete(5))).toEqual({
            data: {
                5: {
                    isLoading: false,
                    error: null,
                    isFavorite: false
                }
            }
        });
    })

    it('should set state on remove favorite error', () => {
        const state = {
            data: {
                5: {
                    isLoading: true,
                    error: null
                }
            }
        }
        expect(reducer(state, onRemoveFavoriteError({ id: 5, error: 'Error' }))).toEqual({
            data: {
                5: {
                    isLoading: false,
                    error: 'Error',
                    isFavorite: true
                }
            }
        });
    })

    it('should reset state', () => {
        const state = {
            data: {
                5: {
                    isLoading: true,
                    error: 'Error',
                    isFavorite: true
                }
            }
        }
        expect(reducer(state, resetToggleFavoriteState())).toEqual({
            data: {}
        });
    })
})