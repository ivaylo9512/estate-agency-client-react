import { BASE_URL } from "../../constants";
import { onPropertiesComplete, getPropertiesData } from "../slices/propertiesPaginationSlice";
import { onUserPropertiesFail } from "../slices/userPropertiesPaginationSlice";

const { takeEvery, select, put } = require("redux-saga/effects");

export default takeEvery('propertiesPagination/getProperties', getProperties)

function* getProperties({payload: query}) {
    const { minPrice, maxPrice, location, bedrooms, take, direction, takeAmount, lastId } =  getQueryData(query, yield select(getPropertiesData))

    const response = yield fetch(`${BASE_URL}/properties/findByWithPage/${takeAmount}/${location.replace(/[\\?%#/'"]/g, '')}/${bedrooms}/${minPrice}/${maxPrice}/${lastId}/${direction}`)
    
    if(response.ok){
        const data = yield response.json();

        data.length = data.properties.length;
        data.lastProperty = data.properties[data.properties.length - 1];
        data.properties = splitProperties(data, take)

        yield put(onPropertiesComplete({
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
    let minPrice = query.minPrice;
    let maxPrice = query.maxPrice;
    let lastId = 0;
    let takeAmount = query.take * query.pages;

    if(!state.isInitial){
        const {id, price} = state.lastProperty;
        
        lastId = id;
        query.direction == 'ASC' ? minPrice = price 
            : maxPrice = price
    }

    return {...query, minPrice, maxPrice, lastId, takeAmount}
}

