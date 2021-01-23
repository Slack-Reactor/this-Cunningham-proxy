/**
 * @jest-environment jsdom
 */

import React from 'react';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import ReviewFilters from '../../src/components/ReviewFilters';

const travelerRatings = {
  excellent: 232,
  good: 198,
  average: 112,
  poor: 13,
  terrible: 2,
}

describe('ReviewFilters component', () => {
  let wrapper;
  const shallow = createShallow();
  const mount = createMount();

  beforeEach(() => {
    wrapper = mount(<ReviewFilters travelerRatings={travelerRatings} />);
  });

  it('Renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Dynamically renders the correct number next to each review rating category', () => {
    expect(wrapper.find('p[data-testid="excellentCount"]').text()).toBe("232");
    expect(wrapper.find('p[data-testid="goodCount"]').text()).toBe("198");
    expect(wrapper.find('p[data-testid="averageCount"]').text()).toBe("112");
    expect(wrapper.find('p[data-testid="poorCount"]').text()).toBe("13");
    expect(wrapper.find('p[data-testid="terribleCount"]').text()).toBe("2");
    const moreRatings = {
      excellent: 211,
      good: 134,
      average: 55,
      poor: 6,
      terrible: 0,
    };
    wrapper.setProps({travelerRatings: moreRatings});
    expect(wrapper.find('p[data-testid="excellentCount"]').text()).toBe("211");
    expect(wrapper.find('p[data-testid="goodCount"]').text()).toBe("134");
    expect(wrapper.find('p[data-testid="averageCount"]').text()).toBe("55");
    expect(wrapper.find('p[data-testid="poorCount"]').text()).toBe("6");
    expect(wrapper.find('p[data-testid="terribleCount"]').text()).toBe("0");
  });

  it('renders 14 checkboxes', () => {
    expect(wrapper.find('input[type="checkbox"]')).toHaveLength(14);
  });

  it('renders 6 radio buttons', () => {
    expect(wrapper.find('input[type="radio"]')).toHaveLength(6);
  });

  it('renders 5 linear progress bars', () => {
    expect(wrapper.find('div[data-testid="progressBar"]')).toHaveLength(5);
  });
});
