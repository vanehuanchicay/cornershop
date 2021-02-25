import React from 'react';
import { configure , shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreateItemModal from './CreateItemModal';
import Modal from './CreateItemModal'

configure({adapter: new Adapter()});

// describe('<CreateItemModal />', () => {
  
//     it('should render Examples modal title if clicked example button example', () =>{
//         const wrapper = shallow(<Modal />);
//         expect(wrapper.find(CreateItemModal))
//     })
// })

it("renders without crashing", () => {
    shallow(<CreateItemModal />);
  });