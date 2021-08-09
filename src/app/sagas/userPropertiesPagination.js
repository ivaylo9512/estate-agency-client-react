import { BASE_URL } from "../../constants";
import { getUserPropertiesData, onUserPropertiesFail, onUserPropertiesComplete } from "../slices/userPropertiesPaginationSlice";
import { takeLatest, select, put } from 'redux-saga/effects';
import splitArray from "../../utils/splitArray";

export default takeLatest('userPropertiesPagination/getUserProperties', getProperties)

function* getProperties({payload: query}) {
    const { name, take, direction, pages, lastName, lastId } = getQueryData(query, yield select(getUserPropertiesData));

    const response = yield fetch(`${BASE_URL}/properties/auth/findUserProperties/${take * pages}/${lastId}/${lastName}/${direction}/${name ? name : ''}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('Authorization')}`
        }
    })
    if(response.ok){
        const data = yield response.json();


        data.length = data.properties.length;
        data.lastProperty = data.properties[data.properties.length - 1]
        data.properties = splitArray(data, take)
    
        yield put(onUserPropertiesComplete({
            data,
            query
        }))        
    }else{
        yield put(onUserPropertiesFail(yield response.text()));
    }
}

const getQueryData = (query, state) => {
    let lastId = 0; 
    let lastName;
    
    if(!state.isInitial){
        const {id, name} = state.lastProperty;

        lastId = id;

        if(!query.name) lastName = name
    }

    return {...query, lastId, lastName}
}

