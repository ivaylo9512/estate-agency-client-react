import useInput, { getId } from 'hooks/useInput';
import usePasswordInput from 'hooks/usePasswordInput';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest, getRegisterRequest } from 'app/slices/authenticateSlice';
import Link from 'next/link';
import InputWithError, { getContainerId } from 'components/InputWithError/InputWithError';

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
                    <InputWithError data-testid={getContainerId(usernameInput)} input={usernameInput} error={error?.username}/>
                    <InputWithError data-testid={getContainerId(emailInput)} input={emailInput} error={error?.email}/>
                    <InputWithError data-testid={getContainerId(passwordInput)} input={passwordInput} error={error?.password}/>
                    <InputWithError data-testid={getContainerId(repeatPasswordInput)} input={repeatPasswordInput} error={error?.password}/>
                    <button data-testid='next' type='submit'>next</button>
                    <span data-testid='redirect'>Already have an account?<Link href='/login'> Log in.</Link></span>
                </form> :
                <form onSubmit={register}>
                    <InputWithError data-testid={getContainerId(nameInput)} input={nameInput} error={error?.name}/>
                    <InputWithError data-testid={getContainerId(locationInput)} input={locationInput} error={error?.location}/>
                    <InputWithError data-testid={getContainerId(descriptionInput)} input={descriptionInput} error={error?.description}/>
                    <button data-testid='back' onClick={(e) => setPage(e, 0)} >back</button>
                    <button data-testid='register' type='submit'>register</button>
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