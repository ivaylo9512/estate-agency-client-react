import useInput from 'hooks/useInput'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputWithError from 'components/InputWithError/InputWithError';
import { getCreatePropertyState, createPropertyRequest } from 'app/slices/createPropertySlice';

const CreateProperty = () => {
    const [createValues, { nameInput, priceInput, locationInput, sizeInput, descriptionInput }] = createInputs(); 
    const [bedrooms, setBedrooms] = useState(1);
    const dispatch = useDispatch();
    const {isLoading, error} = useSelector(getCreatePropertyState);

    const submit = (e) => {
        e.preventDefault();
        if(!isLoading){
            createValues.bedrooms = bedrooms
            dispatch(createPropertyRequest(createValues))
        }
    }

    return(
        <section>
            <h1>CreateProperty</h1>
            <form onSubmit={submit}>
                <label htmlFor='name'>Name:</label>
                <InputWithError input={nameInput} error={error?.name}/>
                <label htmlFor='price'>Price:</label>
                <InputWithError input={priceInput} error={error?.price}/>
                <label htmlFor='location'>Location:</label>
                <InputWithError input={locationInput} error={error?.location}/>
                <label htmlFor='size'>Size:</label>
                <InputWithError input={sizeInput} error={error?.size}/>
                <label htmlFor='description'>description:</label>
                <InputWithError input={descriptionInput} error={error?.description}/>
                <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                </select>
                <button>submit</button>
            </form>
        </section>
    )
}
export default CreateProperty

const createInputs = () => {
    const [name, nameInput] = useInput({
        name: 'name',
        placeholder: 'name',
        validationRules:{
            required: true
        }
    }) 

    const [price, priceInput] = useInput({
        name: 'price',
        placeholder: 'price',
        validationRules:{
            required: true
        }
    }) 

    const [location, locationInput] = useInput({
        name: 'location',
        placeholder: 'location',
        validationRules:{
            required: true
        }
    }) 

    const [description, descriptionInput] = useInput({
        name: 'description',
        placeholder: 'description',
        validationRules:{
            required: true
        }
    }) 

    const [size, sizeInput] = useInput({
        name: 'size',
        placeholder: 'size',
        validationRules:{
            required: true
        }
    }) 
    
    return [{ name, price, description, location, size }, { nameInput, priceInput, descriptionInput, locationInput, sizeInput }]
}
