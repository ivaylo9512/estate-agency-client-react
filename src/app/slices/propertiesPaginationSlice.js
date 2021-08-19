const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    data:{
        pages: 0,
        maxPages: 0,
        properties: [],
        isLoading: false,
        isInitial: true,
        lastProperty: null,
        currentProperties: undefined
    },
    error: null,
    query: {
        take: 2,
        direction: 'ASC',
        bedrooms: 0,
        location: '',
        maxPrice: 0
    }
}

const propertiesPaginationSilce = createSlice({
    name: 'propertiesPagination',
    initialState,
    reducers: {
        resetPropertiesState(state){
            state.data = initialState.data
            state.query = initialState.query;
            state.error = initialState.error;
        },
        onPropertiesComplete(state, {payload: {pageable, query}}){
            state.query = query;
            state.data.maxPages = state.data.pages + pageable.pages;
            state.data.pages = state.data.pages + pageable.data.length;
            state.data.lastProperty = pageable.lastProperty;
            state.data.properties = [...state.data.properties, ...pageable.data];
            state.data.currentProperties = pageable.data[pageable.data.length - 1]
            state.data.isLoading = false;
            state.data.isInitial = false;
            state.error = null
        },
        onPropertiesFail(state, {payload}){
            state.data.isLoading = false
            state.error = payload
        },
        getProperties(state){
            state.error = null
            state.data.isLoading = true;
        },
        setPropertiesDirection(state, action){
            state.query = initialState.query
            state.data = initialState.data
            state.error = initialState.error;
            state.query.direction = action.payload.direction
        },
        setCurrentProperties(state, action){
            state.data.currentProperties = action.payload
        }
    }
})
export const {resetPropertiesState, onPropertiesComplete, onPropertiesFail, getProperties, setPropertiesDirection, setCurrentProperties} = propertiesPaginationSilce.actions
export default propertiesPaginationSilce.reducer

export const getPropertiesData = state => state.propertiesPagination.data;
export const getPropertiesQuery = state => state.propertiesPagination.query;
export const getPropertiesState = state => state.propertiesPagination;