/**
 * @jest-environment jsdom
 */

import React from 'react';
import ReviewCard from '../../src/components/ReviewCard';
import { createMount, createShallow, createRender } from '@material-ui/core/test-utils';
import toJSON from 'enzyme-to-json';


const review = {
  created_at: "2021-01-16T01:04:01.548Z",
  dateOfExperience: "2021-01-16T01:04:01.548Z",
  destination: "Bangkok",
  helpfulVotes: 11,
  images: ["http://d20lp9tw1uk7y6.cloudfront.net/images/tripadvisor_thailand_4.jpg", "http://d20lp9tw1uk7y6.cloudfront.net/images/tripadvisor_thailand_82.jpg", "http://d20lp9tw1uk7y6.cloudfront.net/images/tripadvisor_thailand_23.jpg", "http://d20lp9tw1uk7y6.cloudfront.net/images/tripadvisor_thailand_46.jpg"],
  profilePic: "http://d20lp9tw1uk7y6.cloudfront.net/profilePics/profilePic_people_1.jpg",
  reviewBody: "Et facere aliquam sit eveniet. Ullam deserunt eveniet quos distinctio. Velit nostrum voluptatibus sapiente aut totam molestiae inventore dignissimos porro. Voluptatem nihil qui iste doloribus natus esse. Excepturi praesentium quo earum. Laudantium aliquid voluptas totam enim nostrum.",
  reviewTitle: "dolores vitae quis",
  starRating: 1,
  userHomeLocation: "Niger",
  userName: "Herta Corwin",
}

describe('ReviewCard component', () => {
  let mount;
  let shallow;

  beforeEach(() => {
    mount = createMount();
    shallow = createShallow();
  });


  test('Renders the component', () => {
    const wrapper = shallow(<ReviewCard review={review} helpfulClickHandler={() => null}/>);

    expect(wrapper.exists()).toBe(true);
  });

  test('Renders the correct helpful review count', () => {
    const wrapper = mount(<ReviewCard review={review} helpfulClickHandler={() => null}/>);

    expect(wrapper.find('p[data-testid="votesCounter"]').text()).toBe('11 Helpful votes.');
  });

  test('Renders the correct amout of stars for a review rating', () => {
    const wrapper = mount(<ReviewCard review={review} helpfulClickHandler={() => null}/>);
    expect(wrapper.find('span.MuiRating-iconEmpty').length).toBe(4);
    expect(wrapper.find('span.MuiRating-iconFilled').length).toBe(1);
  });

  test('Renders date of review in a user readable format', () => {
    const wrapper = mount(<ReviewCard review={review} helpfulClickHandler={() => null}/>);
    expect(wrapper.find('p[data-testid="dateOfReview"]').text()).toBe(' wrote a review Jan-2021');
  });
});
