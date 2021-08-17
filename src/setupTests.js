import Enzyme, { ShallowWrapper, ReactWrapper } from "enzyme";
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({
  adapter: new EnzymeAdapter(),
});

function findByTestid(id) {
  return this.find(`[data-testid='${id}']`)
}

ShallowWrapper.prototype.findByTestid = findByTestid
ReactWrapper.prototype.findByTestid = findByTestid