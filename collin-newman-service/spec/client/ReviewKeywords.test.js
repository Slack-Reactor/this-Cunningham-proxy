/**
 * @jest-environment jsdom
 */

import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import ReviewKeywords from '../../src/components/ReviewKeywords';

describe('ReviewKeywords component', () => {
  test('Renders', () => {
    const wrapper = shallow(<ReviewKeywords />);

    expect(wrapper.exists()).toBe(true);
  });
});
