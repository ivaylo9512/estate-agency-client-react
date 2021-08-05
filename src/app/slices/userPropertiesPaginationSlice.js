const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    data:{
        length: 0,
        properties: [],
        pages: 0,
        isLoading: false,
        isInitial: true,
        currentProperties: null
    },
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
            state.data = initialState.data
            state.query = initialState.query;
        },
        setUserProperties(state, {payload: {data, query}}){
            state.query = query;
            state.data.pages = Math.ceil((state.data.length + data.count) / state.query.take);
            state.data.length = state.data.length + data.length;
            state.data.properties = [...state.data.properties, ...data.properties];
            state.data.currentProperties = data.properties[data.properties.length - 1]
            state.data.isLoading = false;
            state.data.isInitial = false;
        },
        getUserProperties(state){
            state.data.isLoading = true;
        },
        setUserPropertiesDirection(state, action){
            state.query = initialState.query
            state.data = initialState.data
            state.query.direction = action.payload.direction
        },
        setCurrentUserProperties(state, action){
            state.data.currentProperties = action.payload
        }
    }
})
export const {resetUserPropertiesState, setUserProperties, getUserProperties, setUserPropertiesDirection, setCurrentUserProperties} = userPropertiesPaginationSilce.actions
export default userPropertiesPaginationSilce.reducer

export const getUserPropertiesData = state => state.userPropertiesPagination.data;
export const getUserPropertiesQuery = state => state.userPropertiesPagination.query;
export const getUserPropertiesState = state => state.userPropertiesPagination;