import loginWatcher from 'app/sagas/login';
import registerWatcher from 'app/sagas/register';
import addFavoriteWatcher from 'app/sagas/addFavorite';
import removeFavoriteWatcher from 'app/sagas/removeFavorite';
import propertiesPaginationWatcher from 'app/sagas/propertiesPagination';
import createPropertyWatcher from 'app/sagas/createProperty';
import favoritesWatcher from 'app/sagas/favorites'
import { all, put } from 'redux-saga/effects';
import userPropertiesPaginationWatcher from 'app/sagas/userPropertiesPagination';
import { onLogout } from 'app/slices/authenticateSlice';

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

            if(err.message == 'jwt expired'){
                return yield put(onLogout('Session has expired.')); 
            }

            if(err.message == 'jwt malformed' || err.message == 'No auth token'){
                return yield put(onLogout());
            }

            console.error(err.message);
        }
    }
}