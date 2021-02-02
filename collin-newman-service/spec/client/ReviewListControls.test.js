/**
 * @jest-environment jsdom
 */

import React from 'react';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import ReviewListControls from '../../src/components/ReviewListControls';
import App from '../../src/components/App';

const testRatings = {
  excellent: 9,
  good: 6,
  average: 3,
  poor: 1,
  terrible: 0,
}

describe('ReviewListControls component', () => {
  let wrapper;
  let shallow;
  let mount

  beforeEach(() => {
    shallow = createShallow();
    mount = createMount();
  });

  it('Renders', () => {
    wrapper = shallow(<ReviewListControls travelerRatings={testRatings} reviewsCount={100} writeReview={() => null}/>);
    expect(wrapper.exists()).toBe(true);
  });

  it('Renders the correct review count', () => {
    wrapper = mount(<ReviewListControls travelerRatings={testRatings} reviewsCount={100} writeReview={() => null}/>);
    expect(wrapper.find('p[data-testid="reviewCount"]').text()).toBe("100");
  });

  it('Renders one button', () => {
    wrapper = mount(<ReviewListControls travelerRatings={testRatings} reviewsCount={100} writeReview={() => null}/>);
    expect(wrapper.find('button').length).toBe(1);
  })
});
