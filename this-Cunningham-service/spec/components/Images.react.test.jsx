import React from 'react';
import { shallow } from 'enzyme';
import Images from '../../src/components/Images';
import data from './mockData';

describe('<Images />', () => {
  let images;
  beforeEach(() => {
    images = shallow(<Images images={data.imageUrl} travelersChoice={data.travelersChoiceAward} />);
  });
  afterEach(() => {
    // images.unmount();
  });
  test('Images should render an image initially', () => {
    expect(images.find('.image').props().src).toBeDefined();
  });
  test('Images should have an overlay', () => {
    expect(images.find('.overlay')).toHaveLength(1);
  });
  test('Images should display travelers choice award if it has one', () => {
    expect(images.instance().props.travelersChoice).toEqual(true);
    expect(images.find('.award')).toHaveLength(1);
    images.setProps({ travelersChoice: false });
    expect(images.instance().props.travelersChoice).toEqual(false);
    expect(images.find('.award')).toHaveLength(0);
  });
  test('Images should have "prev"/"next" buttons to scroll thru pictures if there are more than one picture', () => {
    expect(images.instance().props.images).toHaveLength(10);
    expect(images.find('button')).toHaveLength(2);
    images.setProps({ images: [] });
    expect(images.find('button')).toHaveLength(0);
  });
  test('Images should change to next/prev image if next/prev button is clicked ', () => {
    const instance = images.instance();
    const spy = jest.spyOn(instance, 'changeImage');
    const nextButton = images.find('button.next');
    const prevButton = images.find('button.prev');
    expect(instance.state.displayedImage).toEqual('https://d3tteoxp56tq1d.cloudfront.net/images/tripadvisor_thailand_10.jpg');
    nextButton.simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('next');
    expect(instance.state.displayedImage).toEqual('https://d3tteoxp56tq1d.cloudfront.net/images/tripadvisor_thailand_13.jpg');
    prevButton.simulate('click');
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith('prev');
    expect(instance.state.displayedImage).toEqual('https://d3tteoxp56tq1d.cloudfront.net/images/tripadvisor_thailand_10.jpg');
  });
});
