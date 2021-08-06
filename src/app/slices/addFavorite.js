const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    favoriteStates: new Map()
}

const addFavoriteSlice = createSlice({
    name: 'addFavorite',
    initialState,
    reducers:{
        addFavorite: (state, {payload}) => {
            state.favoriteStates.set(payload, {
                isLoading: true,
                error: null,
                isFavorite: true
            });
        },
        onAddFavoriteComplete: (state, {payload}) => {
            const favoriteState = state.favoriteStates.get(payload);
            favoriteState.isLoading = false;
        },
        onAddFavoriteError: (state, {payload: {id, error}}) => {
            const favoriteState = state.favoriteStates.get(id);
            favoriteState.isLoading = false;
            favoriteState.error = error;
            favoriteState.isFavorite = false;
        },
        resetAddFavoriteState: (state) => {
            state.favoriteStates = initialState.favoriteStates
        }
    }
})

export const {onAddFavoriteComplete, onAddFavoriteError, addFavorite, resetAddFavoriteState} = addFavoriteSlice.actions;
export default addFavoriteSlice.reducer;
export const getAddFavoriteState = state => state.addFavorite;