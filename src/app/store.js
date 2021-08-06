import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authenticate from './slices/authenticate';
import propertiesPagination from './slices/propertiesPaginationSlice';
import createProperty from './slices/createPropertySlice';
import userPropertiesPagination from './slices/userPropertiesPaginationSlice';
import addFavorite from './slices/addFavorite';
import favorites from './slices/favoritesSlice';
import createSaga from 'redux-saga';
import IndexSagas from './sagas';

const sagaMiddleware = createSaga();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const store = configureStore({
    reducer: {
        authenticate,
        propertiesPagination,
        createProperty,
        userPropertiesPagination,
        favorites,
        addFavorite
    },
    middleware
})

sagaMiddleware.run(IndexSagas);

export default store