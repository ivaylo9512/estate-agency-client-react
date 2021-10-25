import { createSlice } from "@reduxjs/toolkit"

export const getLoggedUser = () => typeof window != 'undefined' && localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user')) 
    : null;
    
const user = getLoggedUser();

const initialState = {
    user,
    isAuth: !!user,
    registerRequest: {
        isLoading: false,
        error: null
    },
    loginRequest: {
        isLoading: false,
        error: null
    }
}

const authenticateSlice = createSlice({
    name: 'authenticate',
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.loginRequest.isLoading = true;
            state.loginRequest.error = null;
        },
        registerRequest: (state) => {
            state.registerRequest.isLoading = true;
            state.registerRequest.error = null;
        },
        onLoginComplete: (state, {payload}) => {
            state.user = payload
            state.isAuth = true;
            state.loginRequest.isLoading = false;
            state.loginRequest.error = null;
        },
        onLoginError: (state, {payload}) => {
            state.loginRequest.isLoading = false;
            state.loginRequest.error = payload;
        },
        onRegisterComplete: (state, {payload}) => {
            state.user = payload
            state.isAuth = true;
            state.registerRequest.isLoading = false;
            state.registerRequest.error = null;
        },
        onRegisterError: (state, {payload}) => {
            state.registerRequest.isLoading = false;
            state.registerRequest.error = payload;
        },
        onLogout: (state, {payload}) => {
            state.registerRequest = initialState.registerRequest
            state.loginRequest = {
                ...initialState.loginRequest,
                error: payload
            }
            state.user = null;
            state.isAuth = false;
        },
    }
})

export const { removeUser, loginRequest, registerRequest, onLoginComplete, onLoginError, onRegisterComplete, onRegisterError, onLogout } = authenticateSlice.actions
export default authenticateSlice.reducer

export const getLoginRequest = state => state.authenticate.loginRequest;
export const getRegisterRequest = state => state.authenticate.registerRequest;
export const getUser = state => state.authenticate.user;
export const getIsAuth = state => state.authenticate.isAuth;