import { BASE_URL } from "appConstants";
import { onPropertiesComplete, onPropertiesError, getPropertiesData } from "app/slices/propertiesPaginationSlice";
import { takeLatest, select, put, call } from 'redux-saga/effects';
import splitArray from "utils/splitArray";

export default takeLatest('propertiesPagination/getProperties', getProperties)

export function* getProperties({payload: query}) {
    const { minPrice, maxPrice, location, bedrooms, take, direction, takeAmount, lastId, lastData } =  getQueryData(query, yield select(getPropertiesData))

    const response = yield call(fetch, `${BASE_URL}/properties/findByWithPage/${takeAmount}/${location.replace(/[\\?%#/'"]/g, '')}/${bedrooms}/${minPrice}/${maxPrice}/${lastId}/${direction}`)
    
    if(response.ok){
        const pageable = yield response.json();

        pageable.lastProperty = pageable.count == 0 ? lastData : pageable.data[pageable.data.length - 1];
        pageable.pages = Math.ceil(pageable.count / take);
        pageable.data = splitArray(pageable.data, take);

        yield put(onPropertiesComplete({
            pageable,
            query
        }))
    }else{
        yield put(onPropertiesError(yield response.text()));
    }
}

const getQueryData = (query, data) => {
    const lastData = data.lastData;
    let minPrice = query.minPrice;
    let maxPrice = query.maxPrice;
    let lastId = 0;
    let takeAmount = query.take * query.pages;
    if(lastData){
        const { id, price } = lastData;
        
        lastId = id;
        query.direction == 'ASC' ? minPrice = price 
            : maxPrice = price
    }

    return { ...query, minPrice, maxPrice, lastId, takeAmount, lastData }
}

