import { takeLatest, put } from 'redux-saga/effects';
import { onLoginComplete } from '../slicers/authenticate';
import Router from 'next/router';
import { BASE_URL } from '../../constants';


export default takeLatest('authenticate/loginRequest', login)

function* login({payload}) {
    const response = yield fetch(`${BASE_URL}/users/login`,{
        method: 'POST',
        headers:{
            'Content-Type': 'Application/json',
        },
        body: JSON.stringify(payload)
    })

    const data = yield response.text();

    if(response.ok){
        yield put(onLoginComplete({
            user: JSON.parse(data)
        }))

        localStorage.setItem('Authorization', response.headers.get('Authorization'));
        localStorage.setItem('user', data);
        Router.push('/')
    }else{
        yield put(onLoginComplete({
            error: data,
        }))
    }
}