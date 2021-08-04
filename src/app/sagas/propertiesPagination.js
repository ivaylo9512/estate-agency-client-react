import { BASE_URL } from "../../constants";
import { setProperties } from "../slicers/propertiesPagination-slicer";
import Properties from "../../pages/properties";

const { takeEvery, select, put } = require("redux-saga/effects");

export default takeEvery('propertiesPagination/getProperties', getProperties)

const getPropertiesState = state => state.propertiesPagination.data;

function* getProperties({payload: query}) {
    const state = yield select(getPropertiesState);

    let { minPrice, maxPrice, location, bedrooms, take, direction } = query;
    let lastId = 0;
    let pages = take * query.pages;

    if(minPrice == undefined){
        const lastPage = state.properties[state.properties.length - 1];
        const lastProperty = lastPage[lastPage.length - 1];
        
        lastId = lastProperty.id;
        minPrice = lastProperty.price; 
    }

    const response = yield fetch(`${BASE_URL}/properties/findByWithPage/${pages}/${location}/${bedrooms}/${minPrice}/${maxPrice}/${lastId}/${direction}`)
    const data = yield response.json();

    data.length = data.properties.length;
    data.properties = data.properties.reduce((result, property, i) => {
        const page = Math.floor(i  / take);
        result[page] = result[page] ? (result[page].push(property), result[page]) : [property]

        return result; 
    }, []);

    yield put(setProperties({
        data,
        query
    }))
}

