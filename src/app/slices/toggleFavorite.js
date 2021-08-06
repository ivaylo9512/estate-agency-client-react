const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    favoriteStates: new Map()
}

const toggleFavoriteSlice = createSlice({
    name: 'toggleFavorite',
    initialState,
    reducers:{
        addFavorite: (state, {payload}) => {
            state.favoriteStates.set(payload, {
                isLoading: true,
                error: null,
                isFavorite: true
            });
        },
        removeFavorite: (state, {payload}) => {
            state.favoriteStates.set(payload, {
                isLoading: true,
                error: null,
                isFavorite: false
            })
        },
        onAddFavoriteComplete: (state, {payload: {id}}) => {
            state.favoriteStates.set(id, {
                isLoading: false,
                error: null,
                isFavorite: true
            });
        },
        onAddFavoriteError: (state, {payload: {id, error}}) => {
            state.favoriteStates.set(id, {
                isLoading: false,
                error: error,
                isFavorite: false
            })
        },
        onRemoveFavoriteComplete: (state, {payload}) => {
            state.favoriteStates.set(id, {
                isLoading: false,
                error: error,
                isFavorite: false
            })
        },
        onRemoveFavoriteError: (state, {payload: {id, error}}) => {
            state.favoriteStates.set(id, {
                isLoading: false,
                error: error,
                isFavorite: true
            })
        },
        resetToggleFavoriteState: (state) => {
            state.favoriteStates = initialState.favoriteStates
        }
    }
})

export const {onAddFavoriteComplete, onAddFavoriteError, addFavorite, removeFavorite, onRemoveFavoriteComplete, onRemoveFavoriteError, resetToggleFavoriteState} = addFavoriteSlice.actions;
export default addFavoriteSlice.reducer;
export const getToggleFavoriteState = state => state.toggleFavorite;