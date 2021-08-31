import { takeLatest, put } from "redux-saga/effects";
import { onFavoritesComplete, onFavoritesError } from "../slices/favoritesSlice";
import { BASE_URL } from "../../appConstants";

export default takeLatest('favorites/getFavorites', getFavorites);

function* getFavorites(){
    const response = yield fetch(`${BASE_URL}/properties/getFavorites`)

    if(response.ok){
        yield put(onFavoritesComplete(yield response.json()));
    }else{
        yield put(onFavoritesError(yield response.text()));
    }
}