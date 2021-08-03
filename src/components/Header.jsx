import { useSelector } from "react-redux";
import Link from "next/link";
import { useEffect } from "react";

const { useDispatch } = require("react-redux");
const { removeUser } = require("../app/slicers/authenticate");

const Header = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.authenticate.isAuth);

    const logout = () => {
        dispatch(removeUser())
        localStorage.removeItem('user');
        localStorage.removeItem('Authorization');
    }

    return(
        <header>
            <Link href='/'>home</Link>
            <Link href='/properties'>properties</Link>
            {isAuth ?
                <>
                    <Link href='/create-property'>create</Link>
                    <button onClick={logout}>logout</button>
                </>
                :
                <>
                    <Link href='/login'>login</Link>
                    <Link href='/register'>register</Link>
                </>
            }
        </header>
    )
}
export default Header