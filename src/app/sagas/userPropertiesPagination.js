import { BASE_URL } from "../../constants";
import { getUserPropertiesData, onUserPropertiesFail, onUserPropertiesComplete } from "../slices/userPropertiesPaginationSlice";

const { takeEvery, select, put } = require("redux-saga/effects");

export default takeEvery('userPropertiesPagination/getUserProperties', getProperties)

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
        data.properties = splitProperties(data, take)
    
        yield put(onUserPropertiesComplete({
            data,
            query
        }))        
    }else{
        yield put(onUserPropertiesFail(yield response.text()));
    }
}

const splitProperties = (data, take) => {
    return data.properties.reduce((result, property, i) => {
        const page = Math.floor(i  / take);
        result[page] = result[page] ? (result[page].push(property), result[page]) : [property]

        return result; 
    }, []);
}

const getQueryData = (query, state) => {
    let lastId = 0; 
    let lastName;
    
    if(!state.isInitial){
        const lastPage = state.properties[state.properties.length - 1];
        const {id, name} = lastPage[lastPage.length - 1];

        lastId = id;

        if(!query.name) lastName = name
    }

    return {...query, lastId, lastName}
}

