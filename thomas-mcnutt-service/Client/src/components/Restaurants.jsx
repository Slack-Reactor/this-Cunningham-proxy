import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Restaurant from './Restaurant';

const Restaurants = ({ restaurants }) => (
  <div>
    <Grid container spacing={0}>
      <Grid item xs={2}>
        <h1 style={{ color: 'red' }}>{restaurants.length}</h1>
      </Grid>
      <Grid item xs={10}>
        <h3 style={{ color: 'red' }}>Restaurants</h3>
        <h4>Within 1 mile</h4>
      </Grid>
    </Grid>
    <div>
      <Restaurant
        restaurant={restaurants[0]}
      />
    </div>
    <div>
      <Restaurant
        restaurant={restaurants[1]}
      />
    </div>
    <div>
      <Restaurant
        restaurant={restaurants[2]}
      />
    </div>
  </div>
);

Restaurants.propTypes = {
  restaurants: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    ratings: PropTypes.shape({
      avg: PropTypes.number,
      total: PropTypes.number,
    }),
    imageUrl: PropTypes.string,
    distanceFrom: PropTypes.string,
    foodType: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
};

export default Restaurants;
