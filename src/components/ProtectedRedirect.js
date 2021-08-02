import { useRef, memo, useEffect } from "react"
import { useRouter } from "next/router"
import LoadingIndicator from "./LoadingIndicator"
import { useSelector } from "react-redux"

const ProtectedRedirect = memo(({ children }) => {
    const user = useSelector(state => state.authenticate.user);
    const router = useRouter();
    const routes = useRef(new Map([
        ['/properties', true],
        ['/user', false],
        ['/admin', false],
        ['/create-property', false],
        ['/', true],
        ['/login', 'authenticate'],
        ['/register', 'authenticate']
    ]))

    const route = routes.current.get(router.pathname);

    if(!user && typeof window != 'undefined' && !routes.current.get(router.pathname)){
        router.push('/login');

        return <LoadingIndicator />
    }

    if((route == undefined || (user && route == 'authenticate')) && typeof window != 'undefined'){
        router.push('/')

        return <LoadingIndicator />
    }

    return children
})
export default ProtectedRedirect