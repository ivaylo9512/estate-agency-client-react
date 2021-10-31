import { BASE_URL } from "appConstants";
import Router from 'next/router';
import { onCreatePropertyComplete, onCreatePropertyError } from "app/slices/createPropertySlice";
import { takeLatest, put, call } from 'redux-saga/effects';
import { wrapper } from ".";
import UnauthorizedException from "exceptions/unauthorizedException";

export default takeLatest('createProperty/createPropertyRequest', wrapper(createProperty));

export function* createProperty({ payload }){
    const response = yield call(fetch, `${BASE_URL}/properties/auth/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json',
            Authorization: localStorage.getItem('Authorization') ? `Bearer ${localStorage.getItem('Authorization')}` : null
        },
        body: JSON.stringify(payload)
    })

    if(response.ok){
        const data = yield response.json();

        yield put(onCreatePropertyComplete(data))
        Router.push('/');
    }else{
        if(response.status == 401){
            throw new UnauthorizedException(yield response.text());            
        } 

        yield put(onCreatePropertyError(yield response.json()))
    }
}