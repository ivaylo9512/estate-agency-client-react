import Favorites from '../Favorites';
import * as Redux from 'react-redux';
import { shallow } from 'enzyme';

describe('Favorites snapshot tests', () => {
    let selectorSpy;

    beforeAll(() => {
        jest.spyOn(Redux, 'useDispatch').mockReturnValue(jest.fn());

        selectorSpy = jest.spyOn(Redux, 'useSelector');
    })

    const createWrapper = (favoites) => {
        selectorSpy.mockReturnValue(favoites);

        return shallow(
            <Favorites />
        )
    }

    it('should match snapshot', () => {
        const wrapper = createWrapper({ favorites: [{ id: 'first-favorite', name: 'first favorite' }, { id: 'second-favorrite', name: 'second favorrite' }, { id: 'third-favorite', name: 'third favorite' }]});

        expect(wrapper).toMatchSnapshot();
    })
})