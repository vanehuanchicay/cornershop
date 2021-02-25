import React from 'react';
import { configure , shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreateItemModal from './CreateItemModal';
import Examples from './CreateItemModal';
import createCounter from './CreateItemModal'

configure({adapter: new Adapter()});

describe('<CreateItemModal />', () => {
  
  it("should renders without crashing", () => {
    shallow(<CreateItemModal />);
  });

  it('should createCounter to be truthy', () => {
        expect(createCounter).toBeTruthy();
    });
  it('should render Example component', () => {
    const wrapper = shallow(<CreateItemModal />);
    expect(wrapper.find(Examples)).toBeTruthy();
  });

});