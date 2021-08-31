import { BASE_URL } from "../../appConstants";
import Router from 'next/router';
import { onCreatePropertyComplete } from "../slices/createPropertySlice";
import { takeLatest, put, call } from 'redux-saga/effects';

export default takeLatest('createProperty/createPropertyRequest', createProperty);

function* createProperty({payload}){
    const response = yield call(fetch, `${BASE_URL}/properties/auth/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json',
            Authorization: `Bearer ${localStorage.getItem('Authorization')}`
        },
        body: JSON.stringify(payload)
    })

    const data = yield response.json();
    if(response.ok){
        Router.push('/');
    }else{
        yield put(onCreatePropertyComplete({
            error: data
        }))
        
        if(response.status == 401){
            throw new UnauthorizedException(message);            
        } 
    }
}