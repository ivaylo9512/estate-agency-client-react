import { BASE_URL } from "appConstants";
import { getUserPropertiesData, onUserPropertiesError, onUserPropertiesComplete } from "app/slices/userPropertiesPaginationSlice";
import { takeLatest, select, put, call } from 'redux-saga/effects';
import splitArray from "utils/splitArray";

export default takeLatest('userPropertiesPagination/getUserProperties', getProperties)

export function* getProperties({payload: query}) {
    const { name, take, direction, pages, lastName, lastId } = getQueryData(query, yield select(getUserPropertiesData));

    const response = yield call(fetch, `${BASE_URL}/properties/auth/findUserProperties/${take * pages}/${lastId}/${lastName}/${direction}/${name ? name : ''}`, {
        headers: {
            Authorization: localStorage.getItem('Authorization') ? `Bearer ${localStorage.getItem('Authorization')}` : null
        }
    })
    if(response.ok){
        const pageable = yield response.json();

        pageable.pages = Math.ceil(pageable.count / query.take);
        pageable.lastProperty = pageable.data[pageable.data.length - 1];
        pageable.data = splitArray(pageable.data, query.take);
    
        yield put(onUserPropertiesComplete({
            pageable,
            query
        }))        
    }else{
        yield put(onUserPropertiesError(yield response.text()));

        if(response.status == 401){
            throw new UnauthorizedException(message);            
        } 
    }
}

const getQueryData = (query, state) => {
    let lastId = 0; 
    let lastName;
    let takeAmount = query.take * query.pages;
    
    if(state.lastData){
        const {id, name} = state.lastData;

        lastId = id;

        if(!query.name) lastName = name
    }

    return {...query, lastId, lastName, takeAmount}
}

