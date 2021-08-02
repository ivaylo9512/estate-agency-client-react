import { createSlice } from "@reduxjs/toolkit"

if(typeof window != 'undefined'){
    console.log(localStorage.getItem('user'))
}
const user = typeof window != 'undefined' && localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user'))
    : undefined;

const initialState = {
    user,
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
        setUser: (state, action) => {
            state.user = action.payload;
        },
        removeUser: () => {
            state.user = null
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
            state.user = user;
            state.loginRequest = {
                loading: false,
                error
            }
        },
        onRegisterComplete: (state, action) => {
            const { user, error } = action.payload
            state.user = user;
            state.registerRequest = {
                loading: false,
                error
            }
        }
    }
})

export const { setUser, removeUser, loginRequest, registerRequest, onLoginComplete, onRegisterComplete } = authenticateSlice.actions
export default authenticateSlice.reducer