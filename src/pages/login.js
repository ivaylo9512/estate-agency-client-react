import useInput from "../hooks/useInput"
import Link from 'next/link'
import { useRef } from "react";
import { useLoginMutation } from "../generated/graphql";
import validateEmail from "../helpers/validateEmail";
import { userClient } from "../helpers/client";

const Login = () => {
    const loginInput = useRef();
    const [{usernameOrEmail, password}, {usernameOrEmailInput, passwordInput}] = useCreateInputs();

    const [loginMut, { data }] = useLoginMutation({
        client: userClient
    })
    
    const login = (e) => {
        e.preventDefault();
        
        const variables = { 
            ...validateEmail(usernameOrEmail) ? {email: usernameOrEmail} : { username: usernameOrEmail }, 
            password}
        loginMut({
            variables
        })
    }

    return (
        <section>
            <form onSubmit={login}>
                {usernameOrEmailInput}
                {passwordInput}
                
                <div className='errors'>
                    {data?.login.errors?.map((err, i) => 
                        <span key={i}>{err.message}</span>
                    )}
                </div>
                <span>Don't have an account?<Link href="/register"> Sign up.</Link></span>
                <button>login</button>
            </form>
        </section>
    )
}
export default Login