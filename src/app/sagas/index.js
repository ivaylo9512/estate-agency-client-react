import loginWatcher from './login';
import registerWatcher from './register';
import addFavoriteWatcher from './register';
import propertiesPaginationWatcher from './propertiesPagination';
import createPropertyWatcher from './createProperty';
import favoritesWatcher from './favorites'
import { all } from 'redux-saga/effects';
import userPropertiesPaginationWatcher from './userPropertiesPagination';

export default function* IndexSagas(){
    yield all([registerWatcher, loginWatcher, propertiesPaginationWatcher, createPropertyWatcher, userPropertiesPaginationWatcher, favoritesWatcher, addFavoriteWatcher])
}