import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../app/store'
import ProtectedRedirect from '../components/ProtectedRedirect'
import { useSelector } from 'react-redux'
import Header from '../components/Header'

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <ProtectedRedirect>
                <Header/>
                <Component {...pageProps} />
            </ProtectedRedirect>
        </Provider>
    )
}

export default MyApp
