import { shallow } from 'enzyme';
import Properties from 'pages/properties';

describe('properties snapshot tests', () => {
    const createWrapper = () => shallow(
        <Properties />
    )

    it('should match snapshot', () => {
        const wrapper = createWrapper();
    
        expect(wrapper).toMatchSnapshot();
    })
})