import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Attractions from './Attractions';
import Restaurants from './Restaurants';

const BestNearby = ({ restaurants, attractions }) => (
  <div>
    <h2>
      BestNearby
    </h2>
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Restaurants
          restaurants={restaurants}
        />
      </Grid>
      <Grid item xs={6}>
        <Attractions
          attractions={attractions}
        />
      </Grid>
    </Grid>
  </div>
);

BestNearby.propTypes = {
  restaurants: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    ratings: PropTypes.shape({
      avg: PropTypes.number,
      total: PropTypes.number,
    }),
    imageUrl: PropTypes.string,
    distanceFrom: PropTypes.string,
    foodType: PropTypes.string,
    Price: PropTypes.number,
  })).isRequired,
  attractions: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    ratings: PropTypes.shape({
      avg: PropTypes.number,
      total: PropTypes.number,
    }),
    distanceFrom: PropTypes.string,
    basicDescription: PropTypes.string,
  })).isRequired,

};

export default BestNearby;
