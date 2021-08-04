import { BASE_URL } from "../../constants";
import { setProperties, getUserPropertiesData } from "../slices/userPropertiesPaginationSlice";

const { takeEvery, select, put } = require("redux-saga/effects");

export default takeEvery('userPropertiesPagination/getProperties', getProperties)

function* getProperties({payload: query}) {
    const { name, take, direction } = query;
    const { minPrice, maxPrice, location, bedrooms, take, direction, pages, lastId } =  getQueryData(query, yield select(getUserPropertiesData))

    const response = yield fetch(`${BASE_URL}/properties/auth/findUserProperties/${take}/${lastName}/${lastId}/${direction}/${name}`)
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


