import Favorites from '../Favorites';
import * as Redux from 'react-redux';
import { shallow } from 'enzyme';

describe('Favorites snapshot tests', () => {
    let selectorSpy;

    beforeAll(() => {
        jest.spyOn(Redux, 'useDispatch').mockReturnValue(jest.fn());

        selectorSpy = jest.spyOn(Redux, 'useSelector');
    })

    const createWrapper = (isAuth) => {
        selectorSpy.mockReturnValue(isAuth);

        return shallow(
            <Favorites />
        )
    }

    it('should match snapshot', () => {
        const wrapper = createWrapper({ favorites: ['first favorite', 'second favorrite', 'third favorite'] });

        expect(wrapper).toMatchSnapshot();
    })
})