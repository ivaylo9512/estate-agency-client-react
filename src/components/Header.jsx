import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { removeUser, getIsAuth } from "app/slices/authenticateSlice";

const Header = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(getIsAuth);

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
                    <Link href='/account'>account</Link>
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