import { shallow } from 'enzyme';
import InputWithError from '../InputWithError';

describe('InputWithError snapshot tests', () => {
    const input = <input data-testid='input-id' />

    const createWrapper = () => shallow(
        <InputWithError error='error' className='classname' input={input} />
    )

    it('should match snapshot', () => {
        const wrapper = createWrapper();

        expect(wrapper).toMatchSnapshot();
    })
})