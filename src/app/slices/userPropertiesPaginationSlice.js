const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    data:{
        pages: 0,
        maxPages: 0,
        properties: [],
        lastProperty: null,
        isLoading: false,
        isInitial: true,
        currentProperties: null
    },
    error: null,
    query: {
        take: 2,
        direction: 'ASC',
        name: '',
    }
}

const userPropertiesPaginationSilce = createSlice({
    name: 'userPropertiesPagination',
    initialState,
    reducers: {
        resetUserPropertiesState(state){
            state.error = null
            state.data = initialState.data
            state.query = initialState.query;
        },
        onUserPropertiesComplete(state, {payload: {pageable, query}}){
            state.error = null
            state.query = query;
            state.data.maxPages = state.data.pages + pageable.pages;
            state.data.pages = state.data.pages + pageable.data.length;
            state.data.lastProperty = pageable.lastProperty;
            state.data.properties = [...state.data.properties, ...pageable.data];
            state.data.currentProperties = pageable.data[pageable.data.length - 1]
            state.data.isLoading = false;
            state.data.isInitial = false;
        },
        onUserPropertiesFail(state, {payload}){
            state.data.isLoading = false
            state.error = payload
        },
        getUserProperties(state){
            state.data.isLoading = true;
            state.error = null;
        },
        setUserPropertiesDirection(state, action){
            state.error = null
            state.query = initialState.query
            state.data = initialState.data
            state.query.direction = action.payload.direction
        },
        setCurrentUserProperties(state, action){
            state.data.currentProperties = action.payload
        }
    }
})
export const {resetUserPropertiesState, onUserPropertiesComplete,onUserPropertiesFail, getUserProperties, setUserPropertiesDirection, setCurrentUserProperties} = userPropertiesPaginationSilce.actions
export default userPropertiesPaginationSilce.reducer

export const getUserPropertiesData = state => state.userPropertiesPagination.data;
export const getUserPropertiesQuery = state => state.userPropertiesPagination.query;
export const getUserPropertiesState = state => state.userPropertiesPagination;