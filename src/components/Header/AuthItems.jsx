import Link from 'next/link';

const AuthItems = () => {
    return(
        <>
            <li>
                <Link data-testid='login' href='/login'>login</Link>
            </li>
            <li>
                <Link data-testid='register' href='/register'>register</Link>
            </li>
        </>
    )
}

export default AuthItems