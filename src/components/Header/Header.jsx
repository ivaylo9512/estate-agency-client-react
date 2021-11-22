import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { getIsAuth, onLogout } from "app/slices/authenticateSlice";

const Header = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(getIsAuth);

    const logout = () => {
        dispatch(removeUser())
    }

    return(
        <header>
            <nav>
                <ul>
                    <li>
                        <Link href='/'>home</Link>
                    </li>
                    <li>
                        <Link href='/properties'>properties</Link>
                    </li>
                    {isAuth 
                        ? <>
                            <li>
                                <Link data-testId='create-property' href='/create-property'>create</Link>
                            </li>
                            <li>
                                <Link data-testId='account' href='/account'>account</Link>
                            </li>
                            <li>
                                <button onClick={logout}>logout</button>
                            </li>
                        </>
                        : <>
                            <li>
                                <Link data-testId='login' href='/login'>login</Link>
                            </li>
                            <li>
                                <Link data-testId='register' href='/register'>register</Link>
                            </li>

                        </>
                    }
                </ul>
            </nav>
        </header>
    )
}
export default Header