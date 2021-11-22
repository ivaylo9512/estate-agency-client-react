import PropertiesSearchForm from '../PropertiesSearchForm';
import * as Redux from 'react-redux';
import { shallow } from 'enzyme';

describe('PropertiesSearchForm snapshot tests', () => {
    beforeAll(() => {
        jest.spyOn(Redux, 'useDispatch').mockReturnValue(jest.fn());
        jest.spyOn(Redux, 'useSelector').mockReturnValue(jest.fn());
    })

    const createWrapper = () => shallow(
        <PropertiesSearchForm />
    )

    it('should match snapshot', () => {
        const wrapper = createWrapper(true);

        expect(wrapper).toMatchSnapshot();
    })
})