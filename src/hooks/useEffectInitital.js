import { useRef, useEffect } from 'react'

const useEffectInitial = (callback, dependencies)  => {
    const isInitial = useRef(true);

    useEffect(() => {
        if(isInitial.current){
            isInitial.current = false;
            return;
        }
        callback();
    }, dependencies);

}

export default useEffectInitial