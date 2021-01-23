import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Attraction from './Attraction';

const Attractions = ({ attractions }) => (
  <div className="attractions-list">
    <Grid container spacing={0}>
      <Grid item xs={2}>
        <h1 style={{ color: 'blue' }}>{attractions.length}</h1>
      </Grid>
      <Grid item xs={10}>
        <h3 style={{ color: 'blue' }}>Attractions</h3>
        <h4>Within 1 mile</h4>
      </Grid>
    </Grid>
    <div>
      <Attraction
        attraction={attractions[0]}
      />
    </div>
    <br />
    <div>
      <Attraction
        attraction={attractions[1]}
      />
    </div>
    <br />
    <div>
      <Attraction
        attraction={attractions[2]}
      />
    </div>
  </div>
);

Attractions.propTypes = {
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

export default Attractions;
