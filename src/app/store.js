import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authenticate from 'app/slices/authenticateSlice';
import propertiesPagination from 'app/slices/propertiesPaginationSlice';
import createProperty from 'app/slices/createPropertySlice';
import userPropertiesPagination from 'app/slices/userPropertiesPaginationSlice';
import toggleFavorite from 'app/slices/toggleFavorite';
import deleteProperty from 'app/slices/deleteSlice';
import favorites from 'app/slices/favoritesSlice';
import createSaga from 'redux-saga';
import IndexSagas from 'app/sagas/';
import { all } from 'redux-saga/effects';

const sagaMiddleware = createSaga();

const combinedReducer = combineReducers({
    authenticate,
    propertiesPagination,
    createProperty,
    deleteProperty,
    userPropertiesPagination,
    favorites,
    toggleFavorite
})

const rootReducer = (state, action) => {
    if (action.type === 'authenticate/onLogout') { 
        localStorage.removeItem('Authorization');
        localStorage.removeItem('user');

        return combinedReducer(undefined, action);
    }

    return combinedReducer(state, action);
}

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
});

sagaMiddleware.run(IndexSagas);

export default store

export const createTestStore = ({ reducers, watchers, preloadedState}) => {
    const sagaMiddleware = createSaga();

    const combinedReducer = combineReducers(reducers);
    const rootReducer = (state, action) => {
        if(action.type == 'reset'){
            return combinedReducer(preloadedState, action);
        }

        return combinedReducer(state, action);
    }

    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
        preloadedState
    })

    if(watchers){
        sagaMiddleware.run(function*(){
            yield all(watchers);
        })
    }

    return store;
}