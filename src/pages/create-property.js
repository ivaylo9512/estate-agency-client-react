import useInput from "../hooks/useInput"
import { useEffect } from "react";

const CreateProperty = () => {

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
