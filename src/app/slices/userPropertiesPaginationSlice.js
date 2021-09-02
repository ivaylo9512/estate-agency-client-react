import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    dataInfo:{
        pages: 0,
        maxPages: 0,
        data: [],
        lastData: null,
        currentData: null,
        currentPage: 0,
    },
    query: {
        take: 2,
        direction: 'ASC',
        name: '',
    },
    isLoading: false,
    isInitial: true,
    error: null,
}

const userPropertiesPaginationSilce = createSlice({
    name: 'userPropertiesPagination',
    initialState,
    reducers: {
        getUserProperties(state){
            state.isLoading = true;
            state.error = null;
        },
        onUserPropertiesComplete(state, {payload: {pageable, query}}){
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
        onUserPropertiesError(state, { payload }){
            state.isLoading = false
            state.error = payload
        },
        setUserPropertiesDirection(state, { payload }){
            state.query = {
                ...initialState.query,
                direction: payload
            }
            state.dataInfo = initialState.dataInfo
            state.error = initialState.error;
            state.isInitial = initialState.isInitial;
            state.isLoading = initialState.isLoading;
        },
        setCurrentUserProperties(state, { payload: { currentData, currentPage } }){
            state.dataInfo.currentData = currentData;
            state.dataInfo.currentPage = currentPage;
        },
        resetUserPropertiesState(state){
            state.error = initialState.error;
            state.isLoading = initialState.isLoading;
            state.isInitial = initialState.isInitial;
            state.dataInfo = initialState.dataInfo;
            state.query = initialState.query;
        },
    }
})
export const { resetUserPropertiesState, onUserPropertiesComplete, onUserPropertiesError, getUserProperties, setUserPropertiesDirection, setCurrentUserProperties } = userPropertiesPaginationSilce.actions
export default userPropertiesPaginationSilce.reducer

export const getUserPropertiesData = state => state.userPropertiesPagination.dataInfo;
export const getUserPropertiesQuery = state => state.userPropertiesPagination.query;
export const getUserPropertiesState = state => state.userPropertiesPagination;