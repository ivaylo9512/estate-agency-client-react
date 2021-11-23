import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { getIsAuth, onLogout } from 'app/slices/authenticateSlice';
import LoggedItems from './LoggedItems';
import AuthItems from './AuthItems';

const Header = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(getIsAuth);

    const logout = () => {
        dispatch(onLogout())
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
                        ? <LoggedItems logout={logout}/>
                        : <AuthItems />
                    }
                </ul>
            </nav>
        </header>
    )
}
export default Header