import { BASE_URL } from "../../appConstants";
import { onPropertiesComplete, getPropertiesData } from "../slices/propertiesPaginationSlice";
import { onUserPropertiesFail } from "../slices/userPropertiesPaginationSlice";
import { takeLatest, select, put, call } from 'redux-saga/effects';
import splitArray from "../../utils/splitArray";

export default takeLatest('propertiesPagination/getProperties', getProperties)

function* getProperties({payload: query}) {
    const { minPrice, maxPrice, location, bedrooms, take, direction, takeAmount, lastId } =  getQueryData(query, yield select(getPropertiesData))

    const response = yield call(fetch, `${BASE_URL}/properties/findByWithPage/${takeAmount}/${location.replace(/[\\?%#/'"]/g, '')}/${bedrooms}/${minPrice}/${maxPrice}/${lastId}/${direction}`)
    
    if(response.ok){
        const pageable = yield response.json();

        pageable.lastProperty = pageable.data[pageable.data.length - 1];
        pageable.pages = Math.ceil(pageable.count / query.take);
        pageable.data = splitArray(pageable.data, query.take);

        yield put(onPropertiesComplete({
            pageable,
            query
        }))
    }else{
        yield put(onUserPropertiesFail(yield response.text()));
    }

}

const getQueryData = (query, data) => {
    let minPrice = query.minPrice;
    let maxPrice = query.maxPrice;
    let lastId = 0;
    let takeAmount = query.take * query.pages;

    if(data.lastData){
        const { id, price } = data.lastData;
        
        lastId = id;
        query.direction == 'ASC' ? minPrice = price 
            : maxPrice = price
    }

    return {...query, minPrice, maxPrice, lastId, takeAmount}
}

