import useInput, { InputParams } from "./useInput"
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components";

const Container = styled.div`
    position: relative;
    input{
        width: 100%
    }
`
const Button = styled.button`
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
`
    
const usePasswordInput = (options) => {
    const [type, setType] = useState(options.type);

    const [value, input] = useInput({
        ...options,
        type
    });


    const togglePassword = () => {
        setType(type == 'password' 
            ? 'text'
            : 'password'
        )
    }
    const container = <Container>
            {input}
            {type == 'password' 
                ? <Button type='button' onClick={togglePassword}><FontAwesomeIcon icon={faEye}/></Button>
                : <Button type='button' onClick={togglePassword}><FontAwesomeIcon icon={faEyeSlash}/></Button>
            }
        </Container>

    return [
        value,
        container
    ]
}
export default usePasswordInput