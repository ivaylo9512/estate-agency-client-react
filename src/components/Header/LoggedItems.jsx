import Link from 'next/link';

const LoggedItems = ({ logout }) => {
    return(
        <>
            <li>
                <Link data-testid='create-property' href='/create-property'>create</Link>
            </li>
            <li>
                <Link data-testid='account' href='/account'>account</Link>
            </li>
            <li>
                <button data-testid='logout' onClick={logout}>logout</button>
            </li>
        </>
    )
}

export default LoggedItems