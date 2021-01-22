import React from 'react';
import { shallow } from 'enzyme';
import data from './mockData';
import Tickets from '../../src/components/Tickets';

describe('<Tickets />', () => {
  let tickets;
  beforeEach(() => {
    tickets = shallow(<Tickets current={data} />);
  });
  test('Tickets should render based on props', () => {
    expect(tickets.find('.ticket-header').text()).toEqual('Sukhothai Old City Entrance Tickets');
    expect(tickets.find('strong').text()).toEqual('$238');
    tickets.setProps({ current: { ...data, attractionTitle: 'Test Attraction', ticketPrice: 500 } });
    expect(tickets.find('.ticket-header').text()).toEqual('Test Attraction Entrance Tickets');
    expect(tickets.find('strong').text()).toEqual('$500');
  });
  test('Tickets contains "Check Availability" button', () => {
    expect(tickets.find('button').text()).toEqual('Check Availability');
  });
});
