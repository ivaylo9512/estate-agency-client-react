import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: {}
}

const deleteSlice = createSlice({
    name: 'deleteProperty',
    initialState,
    reducers: {
        deleteProperty: (state, { payload: id }) => {
            let request = state.data[id] ? state.data[id] : state.data[id] = {}; 
            
            request.isLoading = true; 
            request.error = null;
        },
        onDeleteComplete: (state, { payload: id }) => {
            const request = state.data[id];

            request.isLoading = false;
            request.isDeleted = true;
        },
        onDeleteError: (state, { payload: { id, error }}) => {
            const request = state.data[id];

            request.isLoading = false;
            request.error = error;
        },
        resetDelete: (state) => {
            state.data = initialState.data;
        }
    }
})

export const { deleteProperty, onDeleteComplete, onDeleteError, resetDelete } = deleteSlice.actions;
export default deleteSlice.reducer;