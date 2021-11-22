import { shallow } from 'enzyme';
import CreateProperty from 'pages/create-property';
import * as Redux from 'react-redux';

describe('create properties snapshot tests', () => {
    let selectorSpy;

    beforeAll(() => {
        const dispatchMock = jest.fn();
        jest.spyOn(Redux, 'useDispatch').mockReturnValue(dispatchMock);

        selectorSpy = jest.spyOn(Redux, 'useSelector');
    })

    const createWrapper = (errors) => {
        selectorSpy.mockReturnValue(errors);

        return shallow(
            <CreateProperty />
        )
    }
    
    it('should match snapshot with errors', () => {
        const wrapper = createWrapper({ isLoading: false, error: { name: 'name error', price: 'price error', location: 'location error', size: 'size error', description: 'description error' }});

        expect(wrapper).toMatchSnapshot();
    })

    it('should match snapshot without errors', () => {
        const wrapper = createWrapper({ isLoading: false });

        expect(wrapper).toMatchSnapshot();
    })
})