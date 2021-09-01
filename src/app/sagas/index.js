import loginWatcher from './login';
import registerWatcher from './register';
import addFavoriteWatcher from './addFavorite';
import removeFavoriteWatcher from './removeFavorite';
import propertiesPaginationWatcher from './propertiesPagination';
import createPropertyWatcher from './createProperty';
import favoritesWatcher from './favorites'
import { all } from 'redux-saga/effects';
import userPropertiesPaginationWatcher from './userPropertiesPagination';

export default function* IndexSagas(){
    yield all([registerWatcher, loginWatcher, propertiesPaginationWatcher, createPropertyWatcher, userPropertiesPaginationWatcher, favoritesWatcher, addFavoriteWatcher, removeFavoriteWatcher])
}

export function wrapper(request){
    return function*(action){
        try{
            yield request(action);
        }catch(err){
            if(err.message == 'Failed to fetch'){
                yield new Promise(resolve => setTimeout(resolve, 5000));
                return yield fetch(action);
            }

            if(err.message == 'Jwt token has expired.'){
                return yield put(onLogout('Session has expired.')); 
            }

            if(err.message == 'Jwt is incorrect.' || err.message == 'Jwt is missing.'){
                return yield put(onLogout());
            }

            console.error(err.message);
        }
    }
}