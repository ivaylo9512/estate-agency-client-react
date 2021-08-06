import { BASE_URL } from "../../constants";
import { onRemoveFavoriteComplete, onRemoveFavoriteError } from "../slices/toggleFavorite";

const { takeEvery, put } = require("redux-saga/effects");

export default takeEvery('toggleFavorite/removeFavorite', removeFavorite)

function* removeFavorite({payload: id}){
    const response = yield fetch(`${BASE_URL}/properties/auth/removeFavorite/${id}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('Authorization')}`
        }
    })

    if(response.ok){
        yield put(onRemoveFavoriteComplete(id));
    }else{
        yield put(onAddFavoriteError({ 
            error: yield response.text(), 
            id
        }));
    }
}