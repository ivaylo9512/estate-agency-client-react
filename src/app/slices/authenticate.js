import { createSlice } from "@reduxjs/toolkit"

const user = typeof window != 'undefined' && localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user'))
    : undefined;

const initialState = {
    user,
    isAuth: !!user,
    registerRequest: {
        isLoading: false,
        error: undefined
    },
    loginRequest: {
        isLoading: false,
        error: undefined
    }
}

const authenticateSlice = createSlice({
    name: 'authenticate',
    initialState,
    reducers: {
        removeUser: (state) => {
            state.user = undefined;
            state.isAuth = false;
        },
        loginRequest: (state) => {
            state.loginRequest = {
                isLoading: true,
                error: undefined
            }
        },
        registerRequest: (state) => {
            state.registerRequest = {
                isLoading: true,
                error: undefined
            }
        },
        onLoginComplete: (state, action) => {
            const { user, error } = action.payload
            state.user = user
            state.isAuth = true;
            state.loginRequest = {
                isLoading: false,
                error
            }
        },
        onRegisterComplete: (state, action) => {
            const { user, error } = action.payload
            state.user = user
            state.isAuth = true;
            state.registerRequest = {
                isLoading: false,
                error
            }
        }
    }
})

export const { removeUser, loginRequest, registerRequest, onLoginComplete, onRegisterComplete } = authenticateSlice.actions
export default authenticateSlice.reducer