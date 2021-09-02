import { takeLatest, put, call } from 'redux-saga/effects';
import { onLoginComplete, onLoginError } from 'app/slices/authenticateSlice';
import Router from 'next/router';
import { BASE_URL } from 'appConstants';

export default takeLatest('authenticate/loginRequest', login)

export function* login({ payload }) {
    const response = yield call(fetch, `${BASE_URL}/users/login`, {
        method: 'POST',
        headers:{
            'Content-Type': 'Application/json',
        },
        body: JSON.stringify(payload)
    })

    const data = yield response.text();

    if(response.ok){
        yield put(onLoginComplete(JSON.parse(data)));

        localStorage.setItem('Authorization', response.headers.get('Authorization'));
        localStorage.setItem('user', data);
        Router.push('/');
    }else{
        yield put(onLoginError(data));
    }
}