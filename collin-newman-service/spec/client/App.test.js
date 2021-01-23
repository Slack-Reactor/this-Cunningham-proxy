/**
 * @jest-environment jsdom
 */

import React from 'react';
import { createMount, createShallow, createRender } from '@material-ui/core/test-utils';
import App from '../../src/components/App';
import ReviewListControls from '../../src/components/ReviewListControls';
import SearchBar from '../../src/components/SearchBar';
import ReviewList from '../../src/components/ReviewList';
import Pagination from '../../src/components/Pagination';
import sampleReviews from '../server/sampleReviews';

describe('App component', () => {
  let mount;
  let shallow;

  beforeEach(() => {
    mount = createMount();
    shallow = createShallow();
  });

  it('Renders', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  });

  it('clears the reviewsFilter after handleClickClearInput is called', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    wrapper.setState({reviewsFilter: (test) => (test / 6)});
    instance.handleClickClearInput();
    expect(wrapper.state('reviewsFilter')('Please pass')).toBe('Please pass');
  });

  it('creates the correct filter in state for the given input', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    wrapper.setState({ reviews: sampleReviews });
    expect(wrapper.state('reviews')).toHaveLength(100);
    instance.handleChangeFilterReviews('advised');
    expect(wrapper.state('reviewsFilter')(sampleReviews[0])).toBeTruthy();
    expect(wrapper.state('reviewsFilter')(sampleReviews[1])).toBeFalsy();
    expect(wrapper.state('reviewsFilter')(sampleReviews[2])).toBeFalsy();
    expect(wrapper.state('reviewsFilter')(sampleReviews[3])).toBeFalsy();
    expect(wrapper.state('reviewsFilter')(sampleReviews[4])).toBeTruthy();
    expect(wrapper.state('reviewsFilter')(sampleReviews[5])).toBeFalsy();
    expect(wrapper.state('reviewsFilter')(sampleReviews[8])).toBeTruthy();
  });

  it('get the correct reviews for the given filter', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    wrapper.setState({ reviews: sampleReviews });
    wrapper.setState({reviewsFilter: (review) => review.reviewBody.includes('they')});
    expect(wrapper.state('reviews')).toHaveLength(100);
    const reviews = instance.getReviews(0);
    expect(reviews.reviewsToRender).toHaveLength(10);
    expect(reviews.allReviews).toHaveLength(11);
    expect(reviews.reviewsToRender[0]._id).toBe('6008ca1a8befa33fd6fe89e5');
    expect(reviews.reviewsToRender[4]._id).toBe('6008ca1a8befa33fd6fe8a08');
    expect(reviews.reviewsToRender[8]._id).toBe('6008ca1a8befa33fd6fe8a1c');
  });

  it('populates ratings and pages', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    wrapper.setState({ reviews: sampleReviews });
    instance.populateRatingsAndPages();
    expect(wrapper.state('travelerRatings').excellent).toBe(30);
    expect(wrapper.state('travelerRatings').good).toBe(14);
    expect(wrapper.state('travelerRatings').average).toBe(13);
    expect(wrapper.state('travelerRatings').poor).toBe(19);
    expect(wrapper.state('travelerRatings').terrible).toBe(24);
  });
});
