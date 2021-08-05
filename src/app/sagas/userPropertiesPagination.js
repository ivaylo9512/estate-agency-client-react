import { BASE_URL } from "../../constants";
import { setProperties, getUserPropertiesData, setUserProperties } from "../slices/userPropertiesPaginationSlice";

const { takeEvery, select, put } = require("redux-saga/effects");

export default takeEvery('userPropertiesPagination/getUserProperties', getProperties)

function* getProperties({payload: query}) {
    const { name, take, direction, pages, lastName, lastId } = getQueryData(query, yield select(getUserPropertiesData));

    console.log(`${BASE_URL}/properties/auth/findUserProperties/${take * pages}/${lastId}/${lastName}/${direction}/${name ? name.replace(/[\\?%#/'"]/g, '') : ''}`)
    const response = yield fetch(`${BASE_URL}/properties/auth/findUserProperties/${take * pages}/${lastId}/${lastName}/${direction}/${name ? name : ''}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('Authorization')}`
        }
    })
    const data = yield response.json();
    data.length = data.properties.length;
    data.properties = splitProperties(data, take)

    yield put(setUserProperties({
        data,
        query
    }))
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
    
    if(!state.isInitial && !query.name){
        const lastPage = state.properties[state.properties.length - 1];
        const {id, name} = lastPage[lastPage.length - 1];

        lastId = id;
        lastName = name
    }

    return {...query, lastId, lastName}
}

