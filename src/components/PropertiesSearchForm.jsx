import useInput from "hooks/useInput"
import useMinMaxInput from "hooks/useMinMaxInput";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux";
import { getProperties, resetPropertiesState } from "app/slices/propertiesPaginationSlice";
import { useState, useEffect } from "react";

const PropertiesSearchForm = () => {
    const [values, {locationInput, minPriceInput, maxPriceInput}] = createInputs();
    const [bedroom, setBedrooms] = useState();
    const dispatch = useDispatch();
    const query = useSelector(state => state.propertiesPagination.query);

    useEffect(() => {
        return () => dispatch(resetPropertiesState()) 
    },[])

    const submit = (e) => {
        e.preventDefault();

        if(values.location){
            const queryValues = {...query, ...values, pages: 1, bedrooms: e.target.bedrooms.value};
            dispatch(resetPropertiesState())
            dispatch(getProperties(queryValues))
        }
    }

    return(
        <form onSubmit={submit}>
            {locationInput}
            {minPriceInput}
            {maxPriceInput}
            <label htmlFor='bedroom'><FontAwesomeIcon icon={faBed}/></label>
            <select onChange={(e) => setBedrooms(e.target.value)} name='bedrooms'>
                <option value='0'>any</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
            </select>
            <button />
        </form>
    )
}
export default PropertiesSearchForm

const createInputs = () => {
    const [location, locationInput] = useInput({
        name: 'location',
        placeholder: 'location',
        initialValue: ''
    });

    const [minPrice, maxPrice, minPriceInput, maxPriceInput] = useMinMaxInput({
        minName: 'fromPrice',
        maxName: 'toPrice',
        minValue: 0,
        maxValue: 5000 * 1000,
        minInitial: 0,
        maxInitial: 5000 * 1000
    });

    return [{location, minPrice, maxPrice}, {locationInput, minPriceInput, maxPriceInput}]
} 