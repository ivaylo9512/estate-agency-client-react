import { BASE_URL } from "../../constants";
import { setProperties, getPropertiesData } from "../slicers/propertiesPaginationSlicer";

const { takeEvery, select, put } = require("redux-saga/effects");

export default takeEvery('propertiesPagination/getProperties', getProperties)

function* getProperties({payload: query}) {
    const { minPrice, maxPrice, location, bedrooms, take, direction, pages, lastId } =  getQueryData(query, yield select(getPropertiesData))

    const response = yield fetch(`${BASE_URL}/properties/findByWithPage/${pages}/${location}/${bedrooms}/${minPrice}/${maxPrice}/${lastId}/${direction}`)
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
    let lastId = 0;
    let pages = query.take * query.pages;

    if(minPrice == undefined){
        const lastPage = state.properties[state.properties.length - 1];
        const lastProperty = lastPage[lastPage.length - 1];
        
        lastId = lastProperty.id;
        minPrice = lastProperty.price; 
    }

    return {...query, minPrice, lastId, pages}
}

