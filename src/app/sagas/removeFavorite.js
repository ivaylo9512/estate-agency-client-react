import { BASE_URL } from "../../appConstants";
import { onRemoveFavoriteComplete, onRemoveFavoriteError } from "../slices/toggleFavorite";
import { takeEvery, put, call } from 'redux-saga/effects';

export default takeEvery('toggleFavorite/removeFavorite', removeFavorite)

function* removeFavorite({payload: id}){
    const response = yield call(fetch, `${BASE_URL}/properties/auth/removeFavorite/${id}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('Authorization')}`
        }
    })

    if(response.ok){
        yield put(onRemoveFavoriteComplete(id));
    }else{
        yield put(onRemoveFavoriteError({ 
            error: yield response.text(), 
            id
        }));

        if(response.status == 401){
            throw new UnauthorizedException(message);            
        } 
    }
}