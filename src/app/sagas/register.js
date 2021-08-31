import { BASE_URL } from "appConstants"
import { put, takeLatest, call } from 'redux-saga/effects';
import Router from 'next/router';
import { onRegisterComplete, onRegisterError } from "../slices/authenticateSlice";

export default takeLatest('authenticate/registerRequest', register)

export function* register({ payload }){
    const response = yield call(fetch, `${BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(payload)
    })

    const data = yield response.json();
    if(response.ok){
        yield put(onRegisterComplete(data));

        localStorage.setItem('Authorization', response.headers.get('Authorization'));
        localStorage.setItem('user', data);
        Router.push('/')
    }else{
        yield put(onRegisterError(data));
    }
}