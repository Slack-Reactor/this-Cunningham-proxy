/**
 * @jest-environment jsdom
 */

import React from 'react';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import SearchBar from '../../src/components/SearchBar';
import App from '../../src/components/App';

describe('SearchBar component', () => {
  let mount;
  let shallow;

  beforeEach(() => {
    mount = createMount();
    shallow = createShallow();
  });

  it('Renders', () => {
    const wrapper = shallow(<SearchBar handleChangeFilterReviews={() => null} handleClickClearInput={() => null}/>);

    expect(wrapper.exists()).toBe(true);
  });

  // it('Clears the search bar input upon click of button', () => {
  //   const wrapper = mount(<SearchBar handleChangeFilterReviews={() => null} handleClickClearInput={() => ''}/>);


  //   wrapper.find('input[id="searchInput"]').props().value = 'Test';
  //   wrapper.find('button[data-testid="clearSearchBtn"]').simulate('click');
  //   expect(wrapper.find('input[id="searchInput"]').props().value).toBe('');
  // });
});
