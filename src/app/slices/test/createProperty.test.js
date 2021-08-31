import reducer, { createPropertyRequest, onCreatePropertyComplete, onCreatePropertyError, resetCreatePropertyState } from 'app/slices/createPropertySlice';

const initialState = {
    isLoading: false,
    error: null,
    property: null
}

describe('create property slice unit tests', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    })

    it('should set isLoading on create property request', () => {
        expect(reducer(initialState, createPropertyRequest())).toEqual({
            ...initialState,
            isLoading: true
        })
    })

    it('should set property on create complete', () => {
        const property = { id: 5 }
        const state = {
            ...initialState,
            isLoading: true
        }

        expect(reducer(state, onCreatePropertyComplete(property))).toEqual({
            ...initialState,
            property
        })
    })

    it('should set error on create error', () => {
        const error = { name: 'You must provide a name.' }
        const state = {
            ...initialState,
            isLoading: true
        }

        expect(reducer(state, onCreatePropertyError(error))).toEqual({
            ...initialState,
            error
        })
    })

    it('should reset state', () => {
        const state = {
            property: { id: 5 },
            isLoading: true,
            error: { name: 'You must provide a name.' }
        }

        expect(reducer(state, resetCreatePropertyState())).toEqual(initialState);
    })
})