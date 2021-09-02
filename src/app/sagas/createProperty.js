import { BASE_URL } from "appConstants";
import Router from 'next/router';
import { onCreatePropertyComplete, onCreatePropertyError } from "app/slices/createPropertySlice";
import { takeLatest, put, call } from 'redux-saga/effects';

export default takeLatest('createProperty/createPropertyRequest', createProperty);

export function* createProperty({ payload }){
    const response = yield call(fetch, `${BASE_URL}/properties/auth/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json',
            Authorization: localStorage.getItem('Authorization') ? `Bearer ${localStorage.getItem('Authorization')}` : null
        },
        body: JSON.stringify(payload)
    })

    const data = yield response.json();
    if(response.ok){
        yield put(onCreatePropertyComplete(data))
        Router.push('/');
    }else{
        yield put(onCreatePropertyError(data))
        
        if(response.status == 401){
            throw new UnauthorizedException(message);            
        } 
    }
}