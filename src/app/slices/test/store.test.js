import authenticate, { getLoggedUser, onLogout } from 'app/slices/authenticateSlice';
import store, { createTestStore } from 'app/store';
import { deleteProperty } from 'app/slices/deleteSlice';

describe('store tests', () => {
    it('should set user with localStorage', () => {
        localStorage.setItem('user', JSON.stringify({ id: 1 }));

        expect(getLoggedUser()).toEqual({ id: 1 })
    })

    it('should reset store state on logout', () => {
        store.dispatch(deleteProperty(5));
        expect(store.getState().deleteProperty).toEqual({
            data: {
                5: {
                    isLoading: true,
                    error: null
                }
            }
        })

        store.dispatch(onLogout());
        expect(store.getState().deleteProperty).toEqual({
            data: {}
        })
    })

    it('should reset test store with preloadedState on reset dispatch', () => {
        const preloadedState = {
            authenticate: {
                isAuth: true,
                user: {
                    id: 1
                },
                loginRequest: {
                    error: 'error',
                    isLoading: true
                },
                registerRequest: {
                    error: 'error',
                    isLoading: true
                }
            }
        }
        
        const store = createTestStore({ 
            reducers: { authenticate }, 
            preloadedState
        })

        store.dispatch(onLogout('Session expired.'));
        expect(store.getState().authenticate).toEqual({
            isAuth: false,
            user: null,
            loginRequest: {
                error: 'Session expired.',
                isLoading: false
            },
            registerRequest: {
                error: null,
                isLoading: false
            }
        })

        store.dispatch({ type: 'reset' });
        expect(store.getState()).toEqual(preloadedState)
    })
})