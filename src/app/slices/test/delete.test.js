import reducer, { deleteProperty, onDeleteComplete, onDeleteError, resetDelete } from 'app/slices/deleteSlice';

const initialState = {
    data: {}
}
describe('delete slice unit tests', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    })

    it('should set state on delete request', () => {
        expect(reducer(initialState, deleteProperty(5))).toEqual({
            data: {
                5: {
                    isLoading: true,
                    error: null
                }
            }
        })
    })

    it('should set state on delete complete', () => {
        const state = {
            data: {
                5: {
                    isLoading: true,
                    error: null
                }
            }
        }
        expect(reducer(state, onDeleteComplete(5))).toEqual({
            data: {
                5: {
                    isLoading: false,
                    error: null,
                    isDeleted: true
                }
            }
        })
    })

    it('should set state on delete error', () => {
        const state = {
            data: {
                5: {
                    isLoading: true,
                    error: null
                }
            }
        }
        expect(reducer(state, onDeleteError({ id: 5, error: 'Error' }))).toEqual({
            data: {
                5: {
                    isLoading: false,
                    error: 'Error',
                }
            }
        })
    })

    it('should reset state', () => {
        const state = {
            data: {
                5: {
                    isLoading: true,
                    error: null
                }
            }
        }
        expect(reducer(state, resetDelete())).toEqual(initialState);
    })
})