const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    data:{
        length: 0,
        properties: [],
        pages: 0,
        isLoading: false,
        isInitial: true,
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
        onPropertiesComplete(state, {payload: {data, query}}){
            state.error = null
            state.query = query;
            state.data.pages = Math.ceil((state.data.length + data.count) / state.query.take);
            state.data.length = state.data.length + data.length;
            state.data.properties = [...state.data.properties, ...data.properties];
            state.data.currentProperties = data.properties[data.properties.length - 1]
            state.data.isLoading = false;
            state.data.isInitial = false;
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