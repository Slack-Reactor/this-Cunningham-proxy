import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

const Review = ({ review }) => (
  <Grid item xs={12}>
    <p>{review}</p>
  </Grid>
);

Review.propTypes = {
  review: PropTypes.string.isRequired,
};

export default Review;
