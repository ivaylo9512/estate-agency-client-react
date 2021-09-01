import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    error: null,
    property: null
}

const createPropertySlice = createSlice({
    name: 'createProperty',
    initialState,
    reducers: {
        createPropertyRequest: (state) => {
            state.isLoading = true;
            state.error = null;
            state.property = null;
        },
        onCreatePropertyComplete: (state, { payload }) => {
            state.isLoading = false;
            state.property = payload;
            state.error = null;
        },
        onCreatePropertyError: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        resetCreatePropertyState: (state) => {
            state.isLoading = initialState.isLoading;
            state.error = initialState.error;
            state.property = initialState.property;
        }
    }
})

export const { createPropertyRequest, onCreatePropertyComplete, onCreatePropertyError, resetCreatePropertyState } = createPropertySlice.actions
export default createPropertySlice.reducer;

export const getCreatePropertyState = state => state.createProperty