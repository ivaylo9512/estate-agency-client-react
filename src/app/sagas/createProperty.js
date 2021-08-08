import { BASE_URL } from "../../constants";
import Router from 'next/router';
import { onCreatePropertyComplete } from "../slices/createPropertySlice";
import { takeLatest, put } from 'redux-saga/effects';

export default takeLatest('createProperty/createPropertyRequest', createProperty);

function* createProperty({payload}){
    const response = yield fetch(`${BASE_URL}/properties/auth/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json',
            Authorization: `Bearer ${localStorage.getItem('Authorization')}`
        },
        body: JSON.stringify(payload)
    })

    const data = yield response.json();
    if(!response.ok){
        console.log('here')
        yield put(onCreatePropertyComplete({
            error: data
        }))
    }else{
        Router.push('/');
    }
}