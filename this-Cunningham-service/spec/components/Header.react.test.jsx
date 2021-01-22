import React from 'react';
import { shallow } from 'enzyme';
// import renderer from 'react-test-renderer';
// import { shallow, mount, render } from 'enzyme';
import { FaRegHeart } from 'react-icons/fa';
import Attraction from '../../src/components/Attraction';
import Header from '../../src/components/Header';
import data from './mockData';

describe('<Header />', () => {
  let wrapper;
  let app;
  beforeEach(() => {
    app = shallow(<Attraction />);
    wrapper = shallow(<Header current={data} />);
  });
  test('Header should render h3 title-text from prop', () => {
    expect(wrapper.find('.header').find('.header-lg').text()).toEqual('Sukhothai Old City');
  });
  describe('Reviews and like button', () => {
    test('Header should render # of reviews from prop', () => {
      const reviews = wrapper.find('.header').find('.reviews-like');
      expect(reviews.find('.reviews').text()).toEqual('2876 Reviews ');
    });
    test('updateHeartHover should be called once on mouse-enter', () => {
      const instance = app.instance();
      const spy = jest.spyOn(instance, 'updateHeartHover'); // spy on func before you pass as a prop!
      // pass as prop here, it's already spied on
      wrapper.setProps({ updateHeartHover: instance.updateHeartHover });
      const reviews = wrapper.find('.header').find('.reviews-like');
      reviews.find(FaRegHeart).simulate('mouseenter');
      expect(spy).toHaveBeenCalled();
    });
    test('state.likeHover should equal true on mouseOver and false on mouseOut', () => {
      const instance = app.instance();
      wrapper.setProps({ updateHeartHover: instance.updateHeartHover });
      const reviews = wrapper.find('.header').find('.reviews-like');
      expect(app.state().likeHover).toBeFalsy();
      reviews.find(FaRegHeart).simulate('mouseenter'); // make sure these are the right events
      expect(app.state().likeHover).toBeTruthy();
      reviews.find(FaRegHeart).simulate('mouseleave');
      expect(app.state().likeHover).toBeFalsy();
    });
  });
});
