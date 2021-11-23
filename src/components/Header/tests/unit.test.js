import Header from '../Header';
import * as Redux from 'react-redux';
import { mount } from 'enzyme';

describe('Header snapshot tests', () => {
    let selectorSpy;
    let wrapper;

    beforeAll(() => {
        jest.spyOn(Redux, 'useDispatch').mockReturnValue(jest.fn());

        selectorSpy = jest.spyOn(Redux, 'useSelector');
    })

    const createWrapper = (isAuth) => {
        selectorSpy.mockReturnValue(isAuth);

        return mount(
            <Header />
        )
    }

    const checkLogged = (shouldExist) => {
        expect(wrapper.findByTestid('create-property').exists()).toBe(shouldExist);
        expect(wrapper.findByTestid('account').exists()).toBe(shouldExist);
        expect(wrapper.findByTestid('logout').exists()).toBe(shouldExist);
    }   

    const checkAuth = (shouldExist) => {
        expect(wrapper.findByTestid('login').exists()).toBe(shouldExist);
        expect(wrapper.findByTestid('register').exists()).toBe(shouldExist);
    }   

    it('should match snapshot with isAuth to true', () => {
        wrapper = createWrapper(true);

        checkLogged(true);
        checkAuth(false);
    })

    it('should match snapshot with isAuth to false', () => {
        wrapper = createWrapper(false);

        checkLogged(false);
        checkAuth(true);
    })
})