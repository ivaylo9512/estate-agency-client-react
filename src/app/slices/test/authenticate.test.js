import reducer, { loginRequest, registerRequest, onLoginComplete, onLoginError, onRegisterComplete, onRegisterError, onLogout } from 'app/slices/authenticateSlice';

const initialState = {
    user: null,
    isAuth: false,
    registerRequest: {
        isLoading: false,
        error: null
    },
    loginRequest: {
        isLoading: false,
        error: null
    }
}

describe('authenticate slice unit tests', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should update state on login request', () => {
        expect(reducer(initialState, loginRequest())).toEqual({
            ...initialState,
            loginRequest: {
                isLoading: true,
                error: null
            },
        })
    })

    it('should update state on login complete', () => {
        expect(reducer(initialState, onLoginComplete({ id: 5 }))).toEqual({
            ...initialState,
            user: {
                id: 5
            },
            isAuth: true,
        })
    })

    it('should update state on login error', () => {
        expect(reducer(initialState, onLoginError('error'))).toEqual({
            ...initialState,
            loginRequest: {
                isLoading: false,
                error: 'error'
            }
        })
    })

    it('should update state on register request', () => {
        expect(reducer(initialState, registerRequest())).toEqual({
            ...initialState,
            registerRequest: {
                isLoading: true,
                error: null
            },
        })
    })

    it('should update state on register complete', () => {
        expect(reducer(initialState, onRegisterComplete({ id: 5 }))).toEqual({
            ...initialState,
            user: {
                id: 5
            },
            isAuth: true,
        })
    })

    it('should update state on register error', () => {
        expect(reducer(initialState, onRegisterError('error'))).toEqual({
            ...initialState,
            registerRequest: {
                isLoading: false,
                error: 'error'
            },
        })
    })

    it('should update state on logout', () => {
        const state = {
            ...initialState,
            user: { id: 5 },
            isAuth: true,
        }
        
        expect(reducer(state, onLogout("Session expired."))).toEqual({
            ...initialState,
            loginRequest: {
                isLoading: false,
                error: "Session expired."
            }
        })
    })
})