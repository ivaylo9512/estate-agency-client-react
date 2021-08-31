import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    dataInfo: {
        pages: 0,
        maxPages: 0,
        data: [],
        lastData: null,
        currentData: null,
        currentPage: 1,
    },
    query: {
        take: 2,
        direction: 'ASC',
        bedrooms: 0,
        location: '',
        maxPrice: 0
    },
    isLoading: false,
    isInitial: true,
    error: null,
}

const propertiesPaginationSilce = createSlice({
    name: 'propertiesPagination',
    initialState,
    reducers: {
        getProperties(state){
            state.error = null
            state.isLoading = true;
        },
        onPropertiesComplete(state, {payload: { pageable, query }}){
            state.query = query;
            state.dataInfo.maxPages = state.dataInfo.pages + pageable.pages;
            state.dataInfo.pages = state.dataInfo.pages + pageable.data.length;
            state.dataInfo.currentPage = state.dataInfo.pages;
            state.dataInfo.lastData = pageable.lastProperty;
            state.dataInfo.data = [...state.dataInfo.data, ...pageable.data];
            state.dataInfo.currentData = pageable.data[pageable.data.length - 1] || [];
            state.isLoading = false;
            state.isInitial = false;
            state.error = null
        },
        onPropertiesError(state, { payload }){
            state.isLoading = false
            state.error = payload
        },
        setPropertiesDirection(state, { payload }){
            state.query = {
                ...initialState.query,
                direction: payload
            }
            state.dataInfo = initialState.dataInfo
            state.error = initialState.error;
            state.isInitial = initialState.isInitial;
            state.isLoading = initialState.isLoading;
        },
        setCurrentProperties(state, { payload: { currentData, currentPage } }){
            state.dataInfo.currentData = currentData;
            state.dataInfo.currentPage = currentPage;
        },
        resetPropertiesState(state){
            state.isLoading = initialState.isLoading;
            state.isInitial = initialState.isInitial;
            state.dataInfo = initialState.dataInfo
            state.query = initialState.query;
            state.error = initialState.error;
        },
    }
})
export const { resetPropertiesState, onPropertiesComplete, onPropertiesError, getProperties, setPropertiesDirection, setCurrentProperties } = propertiesPaginationSilce.actions
export default propertiesPaginationSilce.reducer

export const getPropertiesData = state => state.propertiesPagination.dataInfo;
export const getPropertiesQuery = state => state.propertiesPagination.query;
export const getPropertiesState = state => state.propertiesPagination;