import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MainScreen from './MainScreen';
import { componentDidMount } from './MainScreen.js';
// import Loading from './MainScreen/';


configure({ adapter: new Adapter() });

describe('<MainScreen />', () => {

  it("should renders without crashing", () => {
    shallow(<MainScreen />);
  });

  it('should render Example component', () => {
    const wrapper = shallow(<MainScreen />);
    expect(wrapper.find('ul.listOfCounters')).toEqual({});
  });

  // test('should isLoading is true', () => {
  //   const isLoading = true;
  //   console.log(Loading);

  //   expect(isLoading).toBe(true);
  // });

  test('should isLoading true when MainScreen is rendering', () => {
    componentDidMount();
    expect(isLoading).toBe(true);
  });

});