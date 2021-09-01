import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    favoriteStates: {}
}

const toggleFavoriteSlice = createSlice({
    name: 'toggleFavorite',
    initialState,
    reducers:{
        addFavorite: (state, { payload: id }) => {
            const favoriteState = state.favoriteStates[id];

            favoriteState.isLoading = true;
            favoriteState.error = null;
        },
        removeFavorite: (state, { payload: id }) => {
            const favoriteState = state.favoriteStates[id];

            favoriteState.isLoading = true;
            favoriteState.error = null;
        },
        onAddFavoriteComplete: (state, { payload: id }) => {
            const favoriteState = state.favoriteStates[id];

            favoriteState.isLoading = false;
            favoriteState.error = null;
            favoriteState.isFavorite = true;
        },
        onAddFavoriteError: (state, {payload: { id, error }}) => {
            const favoriteState = state.favoriteStates[id];

            favoriteState.isLoading = false;
            favoriteState.error = error;
            favoriteState.isFavorite = false;
        },
        onRemoveFavoriteComplete: (state, { payload: id }) => {
            const favoriteState = state.favoriteStates[id];

            favoriteState.isLoading = false;
            favoriteState.error = null;
            favoriteState.isFavorite = false;
        },
        onRemoveFavoriteError: (state, {payload: { id, error }}) => {
            const favoriteState = state.favoriteStates[id];

            favoriteState.isLoading = false;
            favoriteState.error = error;
            favoriteState.isFavorite = true;
        },
        resetToggleFavoriteState: (state) => {
            state.favoriteStates = initialState.favoriteStates
        }
    }
})

export const {onAddFavoriteComplete, onAddFavoriteError, addFavorite, removeFavorite, onRemoveFavoriteComplete, onRemoveFavoriteError, resetToggleFavoriteState} = toggleFavoriteSlice.actions;
export default toggleFavoriteSlice.reducer;
export const getToggleFavoriteState = state => state.toggleFavorite.favoriteStates;
export const getPropertyFavoriteState = id => state => state.toggleFavorite.favoriteStates[id];