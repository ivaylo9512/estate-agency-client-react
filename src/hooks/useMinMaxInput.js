import { useState } from 'react';

const useMinMaxInput = ({ minName, maxName, minInitial, maxInitial, minValue, maxValue}) => {
    const [min, setMin] = useState(minInitial);
    const [max, setMax] = useState(maxInitial);

    const changeMin = ({ target: { value } }) => {
        setMin(Math.min(Math.max(minValue, value), max - 1));
    }

    const changeMax = ({ target: { value } }) => {
        setMax(Math.max(Math.min(value, maxValue), min + 1));
    }

    const minInput = <input onChange={changeMin} name={minName} type='number' min={minValue} value={min}/>
    const maxInput = <input onChange={changeMax} name={maxName} type='number' max={maxValue} value={max}/>


    return [min, max, minInput, maxInput]
}
export default useMinMaxInput;