import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    favorites: [],
    isLoading: false,
    error: null
}

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        getFavorites: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        onFavoritesComplete: (state, {payload}) => {
            state.favorites = payload;
            state.isLoading = false;
            state.error = null;
        },
        onFavoritesError: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload
        },
        resetFavorites: (state) => {
            state.error = initialState.error;
            state.isLoading = initialState.isLoading;
            state.favorites = initialState.favorites
        },
    }
})

export const { getFavorites, onFavoritesComplete, onFavoritesError, resetFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;

export const getFavoritesState = state => state.favorites;