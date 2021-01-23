import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Review from './Review';

const Reviews = ({ reviews }) => (
  <div>
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <Review
          review={reviews[0]}
        />
      </Grid>
      <Grid item xs={4}>
        <Review review={reviews[1]} />
      </Grid>
      <Grid item xs={4}>
        <Review review={reviews[2]} />
      </Grid>
    </Grid>
  </div>
);

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Reviews;
