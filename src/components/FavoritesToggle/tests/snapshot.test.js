import FavoriteToggle from '../FavoriteToggle';
import * as Redux from 'react-redux';
import { shallow } from 'enzyme';

describe('FavoriteToggle snapshot tests', () => {
    let selectorSpy;

    beforeAll(() => {
        jest.spyOn(Redux, 'useDispatch').mockReturnValue(jest.fn());

        selectorSpy = jest.spyOn(Redux, 'useSelector');
    })

    const createWrapper = (state) => {
        selectorSpy.mockReturnValue(state.favoritesState);

        return shallow(
            <FavoriteToggle property={ state.property }/>
        )
    }

    it('should match snapshot with favoritesState and isLoading to true', () => {
        const wrapper = createWrapper({ favoritesState: { isLoading: true }, property: { isFavorite: true }});

        expect(wrapper).toMatchSnapshot();
    })

    it('should match snapshot with favoritesState and isLoading to false and isFavorite to true', () => {
        const wrapper = createWrapper({ favoritesState: { isLoading: false }, property: { isFavorite: true }});

        expect(wrapper).toMatchSnapshot();
    })

    it('should match snapshot with favoritesState and isLoading to false and and isFavorite to false', () => {
        const wrapper = createWrapper({ favoritesState: { isLoading: false }, property: { isFavorite: false }});

        expect(wrapper).toMatchSnapshot();
    })

    it('should match snapshot with undefined favoritesState', () => {
        const wrapper = createWrapper({ property: { isFavorite: true }});

        expect(wrapper).toMatchSnapshot();
    })
})