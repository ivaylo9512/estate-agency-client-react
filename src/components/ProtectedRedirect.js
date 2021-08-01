import { useRef, ReactElement, memo } from "react"
import { UserFragment } from "../generated/graphql"
import { NextComponentType } from "next"
import { useRouter } from "next/router"
import LoadingIndicator from "./LoadingIndicator"

const ProtectedRedirect = memo(({ user, children }) => {
    const router = useRouter();
    const routes = useRef(new Map([
        ['/properties', false],
        ['/user', true],
        ['/admin', true],
        ['/', false],
        ['/login', false],
        ['/register', false]
    ]))

    const route = routes.current.get(router.pathname);

    if(!user && typeof window != 'undefined' && routes.current.get(router.pathname) != false){
        router.push('/login');

        return <LoadingIndicator />
    }

    if(route == undefined && typeof window != 'undefined'){
        router.push('/')

        return <LoadingIndicator />
    }

    return children
})
export default ProtectedRedirect