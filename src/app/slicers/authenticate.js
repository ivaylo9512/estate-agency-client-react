import { createSlice } from "@reduxjs/toolkit"

const user = typeof window != 'undefined' && localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user'))
    : undefined;

const initialState = {
    user,
    isAuth: !!user,
    registerRequest: {
        loading: false,
        errorMessage: undefined
    },
    loginRequest: {
        loading: false,
        error: undefined
    }
}

export const authenticateSlice = createSlice({
    name: 'authenticate',
    initialState,
    reducers: {
        removeUser: (state) => {
            state.user = undefined;
            state.isAuth = false;
        },
        loginRequest: (state) => {
            state.loginRequest = {
                loading: true,
                error: undefined
            }
        },
        registerRequest: (state) => {
            state.registerRequest = {
                loading: true,
                error: undefined
            }
        },
        onLoginComplete: (state, action) => {
            const { user, error } = action.payload
            state.user = user
            state.isAuth = true;
            state.loginRequest = {
                loading: false,
                error
            }
        },
        onRegisterComplete: (state, action) => {
            const { user, error } = action.payload
            state.user = user
            state.isAuth = true;
            state.registerRequest = {
                loading: false,
                error
            }
        }
    }
})

export const { removeUser, loginRequest, registerRequest, onLoginComplete, onRegisterComplete } = authenticateSlice.actions
export default authenticateSlice.reducer