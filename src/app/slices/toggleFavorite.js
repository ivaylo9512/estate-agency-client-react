import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: {}
}

const toggleFavoriteSlice = createSlice({
    name: 'toggleFavorite',
    initialState,
    reducers:{
        addFavorite: (state, { payload: id }) => {
            const favoriteState = state.data[id] ? state.data[id] : state.data[id] = {}; 

            favoriteState.isLoading = true;
            favoriteState.error = null;
        },
        removeFavorite: (state, { payload: id }) => {
            const favoriteState = state.data[id] ? state.data[id] : state.data[id] = {}; 

            favoriteState.isLoading = true;
            favoriteState.error = null;
        },
        onAddFavoriteComplete: (state, { payload: id }) => {
            const favoriteState = state.data[id];

            favoriteState.isLoading = false;
            favoriteState.error = null;
            favoriteState.isFavorite = true;
        },
        onAddFavoriteError: (state, {payload: { id, error }}) => {
            const favoriteState = state.data[id];

            favoriteState.isLoading = false;
            favoriteState.error = error;
            favoriteState.isFavorite = false;
        },
        onRemoveFavoriteComplete: (state, { payload: id }) => {
            const favoriteState = state.data[id];

            favoriteState.isLoading = false;
            favoriteState.error = null;
            favoriteState.isFavorite = false;
        },
        onRemoveFavoriteError: (state, {payload: { id, error }}) => {
            const favoriteState = state.data[id];

            favoriteState.isLoading = false;
            favoriteState.error = error;
            favoriteState.isFavorite = true;
        },
        resetToggleFavoriteState: (state) => {
            state.data = initialState.data
        }
    }
})

export const {onAddFavoriteComplete, onAddFavoriteError, addFavorite, removeFavorite, onRemoveFavoriteComplete, onRemoveFavoriteError, resetToggleFavoriteState} = toggleFavoriteSlice.actions;
export default toggleFavoriteSlice.reducer;
export const getToggleFavoriteState = state => state.toggleFavorite.data;
export const getPropertyFavoriteState = id => state => state.toggleFavorite.data[id];