import Header from '../Header';
import * as Redux from 'react-redux';
import { shallow } from 'enzyme';

describe('Header snapshot tests', () => {
    let selectorSpy;

    beforeAll(() => {
        jest.spyOn(Redux, 'useDispatch').mockReturnValue(jest.fn());

        selectorSpy = jest.spyOn(Redux, 'useSelector');
    })

    const createWrapper = (isAuth) => {
        selectorSpy.mockReturnValue(isAuth);

        return shallow(
            <Header />
        )
    }

    it('should match snapshot with isAuth to true', () => {
        const wrapper = createWrapper(true);

        expect(wrapper).toMatchSnapshot();
    })

    it('should match snapshot with isAuth to false', () => {
        const wrapper = createWrapper(false);

        expect(wrapper).toMatchSnapshot();
    })
})