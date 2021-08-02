import useInput from '../hooks/useInput';
import usePasswordInput from '../hooks/usePasswordInput';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest } from '../app/slicers/authenticate';
import Link from 'next/link';
import InputWithError from '../components/InputWithError';

const Register = () => {
    const [pageIndex, setPageIndex] = useState(0)
    const [registerValues, { usernameInput, passwordInput, repeatPasswordInput, nameInput, emailInput, descriptionInput, locationInput }] = createFields(); 
    
    const {loading, error} = useSelector(state => state.authenticate.registerRequest)
    const dispatch = useDispatch();
    
    const setPage = (e, page) => {
        e.preventDefault()
        setPageIndex(page)
    }
    
    
    const register = (e) => {
        e.preventDefault();
        const {repeatPassword, ...registerObject} = registerValues;

        dispatch(registerRequest(registerObject))
    }

    useEffect(() => {
        const {username, password, email} = error || {};

        if(username || password || email){
            setPageIndex(0);
        }
    },[error])

    return(
        <section>
            {pageIndex == 0 ?
                <form onSubmit={(e) => setPage(e, 1)}>
                    <InputWithError input={usernameInput} error={error?.username}/>
                    <InputWithError input={passwordInput} error={error?.password}/>
                    <InputWithError input={repeatPasswordInput} error={error?.password}/>
                    <InputWithError input={emailInput} error={error?.email}/>
                    <button type='submit'>next</button>
                    <span>Already have an account?<Link href='/login'> Log in.</Link></span>
                </form> :
                <form onSubmit={register}>
                    <InputWithError input={nameInput} error={error?.name}/>
                    <InputWithError input={locationInput} error={error?.location}/>
                    <InputWithError input={descriptionInput} error={error?.description}/>
                    <button onClick={(e) => setPage(e, 0)} >back</button>
                    <button>register</button>
                </form>
            }
        </section>
    )
}

const createFields = () => {
    const [username, usernameInput] = useInput({
        name: 'username',
        placeholder: 'username',
        autoComplete: 'username',
        validationRules: {
            required: true, 
            minLength: 8, 
            maxLength: 20}
        },
    )

    const [password, passwordInput] = usePasswordInput({
        name: 'password',
        type: 'password',
        autoComplete: 'new-password',
        placeholder: 'password',
        validationRules: {
            minLength: 10,
            maxLength: 22,
            required: true
        }
    })

    const [repeatPassword, repeatPasswordInput] = usePasswordInput({
        name: 'repeat-password',
        type: 'password',
        autoComplete: 'new-password',
        placeholder: 'repeat',
        validationRules:{
            required: true
        },
        equalValue: password,
        equalName: 'Passwords'
    })

    const [name, nameInput] = useInput({
        placeholder: 'name' , 
        name: 'name', 
        validationRules: {
            required: true
        } 
    })

    const [email, emailInput] = useInput({
        type: 'email',
        placeholder: 'email',
        name: 'email',
        autoComplete: 'email',
        validationRules: {
            required: true
        } 
    })

    const [location, locationInput] = useInput({
        placeholder: 'location',
        name: 'location',
        validationRules: {
            required: true
        } 
    })

    const [description, descriptionInput] = useInput({
        placeholder: 'description',
        name: 'description',
        validationRules: {
            required: true
        } 
    })

    return [{username, password, repeatPassword, name, email, location, description}, {usernameInput, passwordInput, repeatPasswordInput, nameInput, emailInput, locationInput, descriptionInput}]
}   

export default Register