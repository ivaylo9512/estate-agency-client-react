import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authenticateReducer from './slicers/authenticate';
import createSaga from 'redux-saga';
import IndexSagas from './sagas';

const sagaMiddleware = createSaga();
console.log(sagaMiddleware)
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const store = configureStore({
    reducer: {
        authenticate: authenticateReducer
    },
    middleware
})

sagaMiddleware.run(IndexSagas);

export default store