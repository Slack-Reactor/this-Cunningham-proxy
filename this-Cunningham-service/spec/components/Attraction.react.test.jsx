import React from 'react';
import { shallow, mount } from 'enzyme';
// import renderer from 'react-test-renderer';
// import { shallow, mount, render } from 'enzyme';
import Attraction from '../../src/components/Attraction';
import Header from '../../src/components/Header';
import Images from '../../src/components/Images';
import Overview from '../../src/components/Overview';
import Tickets from '../../src/components/Tickets';
import data from './mockData';

describe('Attraction Component', () => {
  describe('Initial Render', () => {
    test('this.state.current should equal null on initial render', () => {
      expect(shallow(<Attraction />).state().current).toBeNull();
    });
    test('should render Loading Div on initial render', () => {
      expect(shallow(<Attraction />).containsMatchingElement(
        <div className="loading">Loading...</div>,
      )).toBeTruthy();
    });
    test('should only have one child element on initial render', () => {
      expect(shallow(<Attraction />).children()).toHaveLength(1);
    });
  });
  describe('Upon Mounting', () => {
    let fn;
    let wrapper;
    beforeEach(() => {
      fn = jest.spyOn(Attraction.prototype, 'componentDidMount');
      wrapper = mount(<Attraction />);
      return wrapper;
    });
    afterEach(() => {
      mount(<Attraction />).unmount();
    });
    test('should mount and call componentDidMount once', () => {
      expect(fn).toHaveBeenCalled();
    });
    test('should mount with 1 child div.attraction', () => {
      wrapper.setState({ current: data });
      expect(wrapper.children()).toHaveLength(1);
      expect(wrapper.find('.attraction')).toHaveLength(1);
    });
    test('Should remove Loading div upon mounting', () => {
      wrapper.setState({ current: data });
      expect(wrapper.containsMatchingElement(
        <div className="loading">Loading...</div>,
      )).toBeFalsy();
    });
    test('div.attraction should have 4 children', () => {
      wrapper.setState({ current: data });
      expect(wrapper.find('.attraction').children()).toHaveLength(4);
      expect(wrapper.find('.attraction').children().containsMatchingElement(
        Header,
      )).toBeTruthy();
      expect(wrapper.find('.attraction').children().containsMatchingElement(
        Overview,
      )).toBeTruthy();
      expect(wrapper.find('.attraction').children().containsMatchingElement(
        Tickets,
      )).toBeTruthy();
      expect(wrapper.find('.attraction').children().containsMatchingElement(
        Images,
      )).toBeTruthy();
    });
  });
});
