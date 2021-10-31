import { BASE_URL } from "appConstants";
import { onAddFavoriteComplete, onAddFavoriteError } from "app/slices/toggleFavorite";
import { takeEvery, put, call } from 'redux-saga/effects';
import { wrapper } from ".";
import UnauthorizedException from "exceptions/unauthorizedException";

export default takeEvery('toggleFavorite/addFavorite', wrapper(addFavorite))

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
        const error = yield response.text();
        if(response.status == 401){
            throw new UnauthorizedException(error);            
        } 

        yield put(onAddFavoriteError({ 
            error, 
            id
        }));
    }
}