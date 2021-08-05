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
        resetState(state){
            state.data = initialState.data
            state.query = initialState.query;
        },
        setProperties(state, {payload: {data, query}}){
            state.query = query;
            state.data.pages = Math.ceil((state.data.length + data.count) / state.query.take);
            state.data.length = state.data.length + data.length;
            state.data.properties = [...state.data.properties, ...data.properties];
            state.data.currentProperties = data.properties[data.properties.length - 1]
            state.data.isLoading = false;
            state.data.isInitial = false;
        },
        getProperties(state){
            state.data.isLoading = true;
        },
        setDirection(state, action){
            state.query = initialState.query
            state.data = initialState.data
            state.query.direction = action.payload.direction
        },
        setCurrentProperties(state, action){
            state.data.currentProperties = action.payload
        }
    }
})
export const {resetState, setProperties, getProperties, setDirection, setCurrentProperties} = propertiesPaginationSilce.actions
export default propertiesPaginationSilce.reducer

export const getPropertiesData = state => state.propertiesPagination.data;
export const getPropertiesQuery = state => state.propertiesPagination.query;
export const getPropertiesState = state => state.propertiesPagination;