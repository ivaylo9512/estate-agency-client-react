import useInput from "../hooks/useInput"
import useMinMaxInput from "../hooks/useMinMaxInput";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed } from '@fortawesome/free-solid-svg-icons'

const PropertySearchForm = () => {
    const [values, {locationInput, minPriceInput, maxPriceInput, bedroomsInput}] = createInputs();
    
    const submit = (e) => {
        e.preventDefault();
    }
    
    return(
        <form onSubmit={submit}>
            {locationInput}
            {minPriceInput}
            {maxPriceInput}
            <label htmlFor='bedroom'><FontAwesomeIcon icon={faBed}/></label>
            <select name='bedrooms'>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
            {bedroomsInput}
            <button />
        </form>
    )
}
export default PropertySearchForm

const createInputs = () => {
    const [location, locationInput] = useInput({
        name: 'location',
        placeholder: 'location'
    });

    const [minPrice, maxPrice, minPriceInput, maxPriceInput] = useMinMaxInput({
        minName: 'fromPrice',
        maxName: 'toPrice',
        minValue: 0,
        maxValue: 5000 * 1000,
        minInitial: 0,
        maxInitial: 5000 * 1000
    });

    const [bedrooms, bedroomsInput] = useInput({
        name: 'bedrooms',
        type: 'number',
        validationRules: {
            min: 0,
            max: 10
        }
    });

    return [{location, minPrice, maxPrice, bedrooms}, {locationInput, minPriceInput, maxPriceInput, bedroomsInput}]
} 