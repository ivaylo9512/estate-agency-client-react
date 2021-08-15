import useInput from "../hooks/useInput"
import Link from 'next/link'
import validateEmail from "../utils/validateEmail";
import usePasswordInput from "../hooks/usePasswordInput";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest, getLoginRequest } from "../app/slices/authenticate";
import { useEffect } from "react";

const Login = () => {
    const [{usernameOrEmail, password}, {usernameOrEmailInput, passwordInput}] = useCreateInputs();
    const dispatch = useDispatch();
    const {isLoading, error} = useSelector(getLoginRequest);

    const login = (e) => {
        e.preventDefault();

        const user = { 
            ...validateEmail(usernameOrEmail) ? {email: usernameOrEmail} : { username: usernameOrEmail }, 
            password
        }
        
        dispatch(loginRequest(user));
    }

    return (
        <section>
            <form onSubmit={login}>
                {usernameOrEmailInput}
                {passwordInput}
                
                {error &&
                    <div className='errors'>
                        {error}
                    </div>
                }

                <span>Don't have an account?<Link href="/register"> Sign up.</Link></span>
                <button>login</button>
            </form>
        </section>
    )
}
export default Login

const useCreateInputs = () => {
    const [usernameOrEmail, usernameOrEmailInput] = useInput({
        placeholder: 'username or email', 
        name: 'username',
        testid: 'username'
    });
    
    const [password, passwordInput] = usePasswordInput({
        placeholder: 'password', 
        name: 'password', 
        type: 'password',
        testid: 'password',
        autoComplete: 'current-password',
    });

    return [{usernameOrEmail, password}, {usernameOrEmailInput, passwordInput}]
}