import { wrapper } from "app/sagas/index";
import { put, takeEvery, call } from "redux-saga/effects";
import { BASE_URL } from "appConstants";
import { onDeleteComplete, onDeleteError } from 'app/slices/deleteSlice';
import UnauthorizedException from "exceptions/unauthorizedException";

export default takeEvery('delete/deleteProperty', wrapper(deleteProperty));

export function* deleteProperty({payload: id}){
    const response = yield call(fetch, `${BASE_URL}/properties/auth/delete/${id}`, {
        method: 'DELETE',
        headers:{
            Authorization: localStorage.getItem('Authorization')
        }
    });

    if(response.ok){
        yield put(onDeleteComplete(id))
    }else{
        const message = yield response.text()
        if(response.status == 401){
            throw new UnauthorizedException(message);            
        } 

        yield put(onDeleteError(id));
    }
}