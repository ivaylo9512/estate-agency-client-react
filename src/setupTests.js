import Enzyme, { ShallowWrapper } from "enzyme";
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({
  adapter: new EnzymeAdapter(),
});

const findByTestid = (id) => {
  this.find(`[data-testid='${id}']`)
}

ShallowWrapper.prototype.findByTestid = findByTestid
ReactWrapper.prototype.findByTestid = findByTestid