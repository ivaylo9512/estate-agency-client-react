import { BASE_URL } from "../../constants";
import { onAddFavoriteComplete, onAddFavoriteError } from "../slices/toggleFavorite";

const { takeEvery, put } = require("redux-saga/effects");

export default takeEvery('toggleFavorite/addFavorite', addFavorite)

function* addFavorite({payload: id}){
    const response = yield fetch(`${BASE_URL}/properties/auth/addFavorite/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('Authorization')}`
        }
    })

    const data = response.text();
    if(response.ok){
        yield put(onAddFavoriteComplete(data));
    }else{
        yield put(onAddFavoriteError(data));
    }
}