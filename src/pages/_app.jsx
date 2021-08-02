import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../app/store'
import ProtectedRedirect from '../components/ProtectedRedirect'
import { useSelector } from 'react-redux'

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <ProtectedRedirect>
                <Component {...pageProps} />
            </ProtectedRedirect>
        </Provider>
    )
}

export default MyApp
