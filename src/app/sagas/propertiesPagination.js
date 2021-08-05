import { BASE_URL } from "../../constants";
import { setProperties, getPropertiesData } from "../slices/propertiesPaginationSlice";

const { takeEvery, select, put } = require("redux-saga/effects");

export default takeEvery('propertiesPagination/getProperties', getProperties)

function* getProperties({payload: query}) {
    const { minPrice, maxPrice, location, bedrooms, take, direction, takeAmount, lastId } =  getQueryData(query, yield select(getPropertiesData))

    const response = yield fetch(`${BASE_URL}/properties/findByWithPage/${takeAmount}/${location.replace(/[\\?%#/'"]/g, '')}/${bedrooms}/${minPrice}/${maxPrice}/${lastId}/${direction}`)
    const data = yield response.json();

    data.length = data.properties.length;
    data.properties = splitProperties(data, take)

    yield put(setProperties({
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
    let minPrice = query.minPrice;
    let maxPrice = query.maxPrice;
    let lastId = 0;
    let takeAmount = query.take * query.pages;

    if(!state.isInitial){
        const lastPage = state.properties[state.properties.length - 1];
        const {id, price} = lastPage[lastPage.length - 1];
        
        lastId = id;
        query.direction == 'ASC' ? minPrice = price 
            : maxPrice = price
    }

    return {...query, minPrice, maxPrice, lastId, takeAmount}
}

