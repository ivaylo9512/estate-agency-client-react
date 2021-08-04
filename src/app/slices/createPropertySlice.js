const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    isLoading: false,
    error: null,
}

const createPropertySlice = createSlice({
    name: 'createProperty',
    initialState,
    reducers: {
        createPropertyRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        onCreatePropertyComplete: (state, action) => {
            state.isLoading = false;
            state.error = action.payload.error;
        }
    }
})

export const { createPropertyRequest, onCreatePropertyComplete } = createPropertySlice.actions
export default createPropertySlice.reducer;

export const getCreatePropertyState = state => state.createProperty