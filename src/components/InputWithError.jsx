import { getId } from "hooks/useInput"

const InputWithError = ({error, classname = '', input}) => {

    return(
        <div className={(error ? 'error ' : '') + classname}>
            {input}
            {error && 
                <div data-testid={`${getId(input)}Error`}>
                    {error}
                </div>
            }
        </div>
    )
}

export const getContainerId = input => `${getId(input)}Container`;

export default InputWithError