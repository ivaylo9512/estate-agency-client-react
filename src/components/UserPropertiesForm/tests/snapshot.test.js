import UserPropertiesForm from '../UserPropertiesForm';
import * as Redux from 'react-redux';
import { shallow } from 'enzyme';

describe('UserPropertiesForm snapshot tests', () => {
    beforeAll(() => {
        jest.spyOn(Redux, 'useDispatch').mockReturnValue(jest.fn());
        jest.spyOn(Redux, 'useSelector').mockReturnValue(jest.fn());
    })

    const createWrapper = () => shallow(
        <UserPropertiesForm />
    )

    it('should match snapshot', () => {
        const wrapper = createWrapper(true);

        expect(wrapper).toMatchSnapshot();
    })
})