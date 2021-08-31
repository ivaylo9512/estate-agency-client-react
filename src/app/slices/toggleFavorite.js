import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    favoriteStates: {}
}

const toggleFavoriteSlice = createSlice({
    name: 'toggleFavorite',
    initialState,
    reducers:{
        addFavorite: (state, {payload}) => {
            state.favoriteStates[payload] = {
                isLoading: true,
                error: null,
                isFavorite: true
            };
        },
        removeFavorite: (state, {payload}) => {
            state.favoriteStates[payload] = {
                isLoading: true,
                error: null,
                isFavorite: false
            }
        },
        onAddFavoriteComplete: (state, {payload}) => {
            state.favoriteStates[payload] = {
                isLoading: false,
                error: null,
                isFavorite: true
            }
        },
        onAddFavoriteError: (state, {payload: {id, error}}) => {
            state.favoriteStates[id] = {
                isLoading: false,
                error: error,
                isFavorite: false
            }
        },
        onRemoveFavoriteComplete: (state, {payload}) => {
            state.favoriteStates[payload] = {
                isLoading: false,
                error: null,
                isFavorite: false
            }
        },
        onRemoveFavoriteError: (state, {payload: {id, error}}) => {
            state.favoriteStates[id] = {
                isLoading: false,
                error: error,
                isFavorite: true
            }
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