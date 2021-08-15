import useInput from '../hooks/useInput';
import usePasswordInput from '../hooks/usePasswordInput';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest, getRegisterRequest } from '../app/slices/authenticate';
import Link from 'next/link';
import InputWithError from '../components/InputWithError';

const Register = () => {
    const [pageIndex, setPageIndex] = useState(0)
    const [registerValues, { usernameInput, passwordInput, repeatPasswordInput, nameInput, emailInput, descriptionInput, locationInput }] = createFields(); 
    
    const {isLoading, error} = useSelector(getRegisterRequest);
    const dispatch = useDispatch();
    
    const setPage = (e, page) => {
        e.preventDefault();
        setPageIndex(page);
    }
    
    
    const register = (e) => {
        e.preventDefault();
        const {repeatPassword, ...registerObject} = registerValues;

        dispatch(registerRequest(registerObject));
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
                    <InputWithError data-testid={getId(usernameInput)} input={usernameInput} error={error?.username}/>
                    <InputWithError data-testid={getId(emailInput)} input={emailInput} error={error?.email}/>
                    <InputWithError data-testid={getId(passwordInput)} input={passwordInput} error={error?.password}/>
                    <InputWithError data-testid={getId(repeatPasswordInput)} input={repeatPasswordInput} error={error?.password}/>
                    <button type='submit'>next</button>
                    <span>Already have an account?<Link href='/login'> Log in.</Link></span>
                </form> :
                <form onSubmit={register}>
                    <InputWithError data-testid={getId(nameInput)} input={nameInput} error={error?.name}/>
                    <InputWithError data-testid={getId(locationInput)} input={locationInput} error={error?.location}/>
                    <InputWithError data-testid={getId(descriptionInput)} input={descriptionInput} error={error?.description}/>
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
        testid: 'username',
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
        testid: 'password',
        validationRules: {
            minLength: 10,
            maxLength: 22,
            required: true
        }
    })

    const [repeatPassword, repeatPasswordInput] = usePasswordInput({
        name: 'repeatPassword',
        type: 'password',
        testid: 'repeatPassword',
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
        testid: 'name',
        validationRules: {
            required: true
        } 
    })

    const [email, emailInput] = useInput({
        type: 'email',
        placeholder: 'email',
        name: 'email',
        testid: 'email',
        autoComplete: 'email',
        validationRules: {
            required: true
        } 
    })

    const [location, locationInput] = useInput({
        placeholder: 'location',
        name: 'location',
        testid: 'location',
        validationRules: {
            required: true
        } 
    })

    const [description, descriptionInput] = useInput({
        placeholder: 'description',
        name: 'description',
        testid: 'description',
        validationRules: {
            required: true
        } 
    })

    return [{username, password, repeatPassword, name, email, location, description}, {usernameInput, passwordInput, repeatPasswordInput, nameInput, emailInput, locationInput, descriptionInput}]
}   

export default Register