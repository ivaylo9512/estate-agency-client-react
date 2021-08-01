const Register = () => {

}

const useCreateFields = () => {
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
        autoComplete: 'email'
    })

    const [location, locationInput] = useInput({
        placeholder: 'location',
        name: 'location',
    })

    return [{username, password, repeatPassword, name, email, location, birth}, {usernameInput, passwordInput, repeatPasswordInput, nameInput, emailInput, locationInput, birthInput}]
}   

export default Register