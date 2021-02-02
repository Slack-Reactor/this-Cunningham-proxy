/**
 * @jest-environment jsdom
 */

import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Pagination from '../../src/components/Pagination';

describe('Pagination component', () => {
  test('Renders', () => {
    const wrapper = shallow(<Pagination />);

    expect(wrapper.exists()).toBe(true);
  });

  test('Button click does not refresh page', () => {
    const wrapper = shallow(<Pagination />);

    wrapper.find('.button-pagination').forEach(button => {
      button.simulate('click', {
        preventDefault: () => {
          prevented = true;
        }
      });
    });
  });
});
