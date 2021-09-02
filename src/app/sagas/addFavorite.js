import { BASE_URL } from "appConstants";
import { onAddFavoriteComplete, onAddFavoriteError } from "app/slices/toggleFavorite";
import { takeEvery, put, call } from 'redux-saga/effects';

export default takeEvery('toggleFavorite/addFavorite', addFavorite)

export function* addFavorite({payload: id}){
    const response = yield call(fetch, `${BASE_URL}/properties/auth/addFavorite/${id}`, {
        method: 'PATCH',
        headers: {
            Authorization: localStorage.getItem('Authorization') ? `Bearer ${localStorage.getItem('Authorization')}` : null
        }
    })

    if(response.ok){
        yield put(onAddFavoriteComplete(id));
    }else{
        yield put(onAddFavoriteError({ 
            error: yield response.text(), 
            id
        }));

        if(response.status == 401){
            throw new UnauthorizedException(message);            
        } 
    }
}