import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import authenticate from 'slices/authenticateSlice';
import propertiesPagination from 'slices/propertiesPaginationSlice';
import createProperty from 'slices/createPropertySlice';
import userPropertiesPagination from 'slices/userPropertiesPaginationSlice';
import toggleFavorite from 'slices/toggleFavorite';
import favorites from 'slices/favoritesSlice';
import createSaga from 'redux-saga';
import IndexSagas from 'sagas';

const sagaMiddleware = createSaga();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const combinedReducer = combineReducers({
    authenticate,
    propertiesPagination,
    createProperty,
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
    middleware
});

sagaMiddleware.run(IndexSagas);

export default store